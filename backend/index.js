//const sslRedirect = require('heroku-ssl-redirect');   
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fetch = require("node-fetch");
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const nodemailer = require('nodemailer');
const OAuth2Data = require('./google_key.json')
const passport = require('passport');
const GoogleStrategy = require('./passport/GoogleStrategy');
const LocalStrategy = require('./passport/localStrategy');
const User = require('./server/User');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

//app.use(sslRedirect());

app.use(cors());
app.use(express.json());

// constants
const REDIRECT_URL = process.env.REDIRECT_URL;
const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;

const CLIENT_ID = OAuth2Data.client.id;
const CLIENT_SECRET = OAuth2Data.client.secret;
const AUTH_REDIRECT = OAuth2Data.client.redirect;


//Create a new MongoClient
/* const client = new  MongoClient(MONGO_URL, {useUnifiedTopology: true});

client.connect(function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
  
    const db = client.db(DB_NAME);
  
    const col = db.collection('Users').find({}).toArray(function(err, result){
        if (err) throw err;
        console.log(result);
        //db.close();   
    });
  });
*/


//Creating a Mongo instance
mongoose.connect('mongodb+srv://Anudeep:abcd1234@cluster0-94hkc.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
    console.log("connection to db open")
});


/**
 * This route is an API endpoint for the services to call
 * that will return information about the specified 
 * AirBNB listing. If the request does not include
 * a listing url, it simply redirects to the dashboard
 * 
 */
app.get('/api/report', function(req, res) {
    console.log("request received...\n")

    let listing_url = req.headers.url; 
    if (listing_url === undefined) {
        res.redirect(REDIRECT_URL)
    } 
    else { // call the necessary Python scripts
        const spawn = require("child_process").spawn;
        const pythonProcess = spawn('python3',["scripts/api-handler.py", listing_url]);


        pythonProcess.stdout.on('data', (data) => {
            // Do something with the data returned from python script
            console.log(data.toString())
            if (data.toString().includes("success")) {
                let filename = "./"
                filename += data.toString().split(" ")[1]
                let response = require(filename)
                console.log(response)
                res.send(response)
                response = undefined
            } else {
                res.status(400).send({message: "error"}) 
            }

            /*
            console.log("here\n\n")
            console.log(data.toString())
            res.send(JSON.parse(data.toString()))
            */
        });
    }
})

/**
 * This route is an API endpoint to validate a specified url 
 * is valid or not. Specifically, whether the url is a valid
 * Airbnb listing url
 * 
 */
app.get('/api/validate', function(req, res) {
    let listing_url = req.headers.url.toString()
    if (listing_url.includes("airbnb.com") && listing_url.includes("rooms")) {
        res.send({
            valid: true
        })
    }
    else {
        res.send({
            valid: false
        })
    }
})

//Authentication 
app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(
	session({
		secret: 'foo',
		store: new MongoStore({ mongooseConnection: db }),
		resave: false,
		saveUninitialized: false
	})
)


passport.use(GoogleStrategy);
passport.use(LocalStrategy);


passport.serializeUser(function(user, done) {
    console.log("id: " + user.id);
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.findOne(
		{ _id: id },
		(err, user) => {
			console.log(user);
			done(null, user);
		}
	)
    console.log("deserialize");
});

// Route that receives a GET request to /auth/google
app.get('/login/google',
  passport.authenticate('google', { scope: ['profile'] }));

// GET /auth/google/callback
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
  function(req, res) {
    //console.log(req.user);
    //console.log(res)
    res.redirect('http://localhost:3000/userhome?q=' + req.user._id);
  });

// TODO: Create route for chrome extension for Google OAuth

// Route that recieves a POST to local login
app.post('/login',
  passport.authenticate('local', { failureRedirect: 'http://localhost:3000/login' }),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    //console.log(res);
    console.log(req.user.id);
    res.send(req.user.id);
  });


// Route that recieves a GET for logout  
app.get('/logout', function(req, res) {
    console.log("Logging Out");
    req.logout();
    res.redirect('http://localhost:3000');
});

// Route that recieves a POST request for register
app.post('/register', function(req, res) {
    const newUser = new User({
        'regularLogin.username': req.body.email,
        'regularLogin.password': req.body.password
    })
    newUser.save(function(err) {
        if (err) {
            return self.error(err);
        }
        console.log("saved!")
    });
    console.log("registered!");
})

// Route that recieves a GET request for obtaining user information
app.get('/userinfo', function(req, res) {
    console.log(req.user);
    return req.user;
})

// Route that recieves a POST request to remove a listing
app.post('/removeListing', function(req, res) {
    let id = req.body.id;
    let url = req.body.url;
    let listings = []
    /*User.findOne({ _id : id }, function(err, user) {
        if (err) { console.log("user doesn't exist"); }
        listings = user.listings
      });
    listings = listings.filter(function(listing) {
        return listing !== url;
    });
    */
    User.update({_id : id}, { $pull: { listings: url } } , err => {
        if (err) {
            console.log(err);
        } else {
            console.log("Removed listing with url: " + url);
        }
    });
})

app.post('/addListing', function(req, res) {
    let id = req.body.id;
    let url = req.body.url;
    let listings = []
    console.log(id);
    console.log(url)
    //User.findOne({ _id : id }, function(err, user) {
    //    if (err) { console.log("user doesn't exist") }
    //    listings = user.listings
    //  });
    //console.log(listings);
    //listings.push(url)
    User.update({_id : id}, {$addToSet: {listings: url}}, err => {
        if (err) {
            console.log(err);
        } else {
            console.log("Added listing with url: " + url);
        }
    });
})

app.post('/getListings', function(req, res) {
    let id = req.body.id
    User.findOne({ _id : id }, function(err, user) {
        if (err) { return done(err); }
        res.send(user.listings);
      });
})

app.post('/getprefs', function(req, res) {
    console.log("inside getprefs")
    console.log(req.body.id)
    let id = req.body.id
    User.findOne({ _id: id}, function(err, user) {
        if (err) { return done(err); }
        console.log(user)
        res.send(user.preferences)
    });
})

app.post('/setprefs', function(req, res) {
    let id = req.body.id
    let prefs = req.body.prefs
    let langs = req.body.langdata
    User.update({ _id: id}, {preferences: prefs}, {langdata: langs},  err => {
        if (err) {
            console.log(err)
        } else {
            res.send(200)
            console.log("Preferences are now" + prefs)
            console.log("Langs are now", langs)
        }
    })

})

// Route that recieves a POST request to /getTrips
app.post('/getTrips', function(req, res) {
    let id = req.body.id;
    User.findOne({ _id : id }, function(err, user) {
        if (err) { return done(err); }
        res.send(user.trips);
      });
})

// Route that recieves a POSt request to /addTrip
app.post('/addTrip', function(req, res) {
    let id = req.body.id;
    let name = req.body.name;
    let obj = {
        'name': name,
        'listings': []
    }
    console.log(id);
    console.log(url)
    User.update({_id : id}, {$addToSet: {trips: obj}}, err => {
        if (err) {
            console.log(err);
        } else {
            console.log("Added trip with name: " + name);
        }
    });
})

// Route that recieves a POST request to remove a trip
app.post('/removeTrip', function(req, res) {
    let id = req.body.id;
    let nameToRemove = req.body.name;
    User.update({_id : id}, { $pull: { trips: {name: nameToRemove} } } , err => {
        if (err) {
            console.log(err);
        } else {
            console.log("Removed trip with name: " + name);
        }
    });
})

// Route that recieves a POST request to remove a listing from a trip
app.post('/removeListingFromTrip', function(req, res) {
    let id = req.body.id;
    //let tripName = req.body.tripName;
    let lisitngUrl = req.body.listing;
    User.update({_id : id}, { $pull: { trips: {listings: lisitngUrl} } } , err => {
        if (err) {
            console.log(err);
        } else {
            console.log("Removed listing with url: " + listingToRemove);
        }
    });
})

// Route that recieves a POST request to add a listing to a trip
app.post('/addLitingFromTrip', function(req, res) {
    let id = req.body.id;
    let tripName = req.body.trip;
    let listingUrl = req.body.listing;
    var path = 'trips.$.' + tripName + 'listings';
    User.update({_id : id}, {$addToSet: {path: listingUrl} }, err => {
        if (err) {
            console.log(err);
        } else {
            console.log("Added listing to trip with url: " + listingUrl);
        }
    });
})

// Route that recieves a POST request to get trip listings
app.post('/getTripListings', function(req, res) {
    let id = req.body.id;
    let trip = req.body.tripName;
    User.findOne({ _id : id }, function(err, user) {
        if (err) { return done(err); }
        var obj = user.trips.find(o => o.name === 'trip');
        res.send(obj['listings']);
      });
})

// Route that recieves a POST request to /email
app.post('/email', function (req, res) {
    const body = req.body.Body
    res.set('Content-Type', 'text/plain')
    res.send(`You sent: ${body} to Express`)
    console.log(req['body'])

    const message = "Email: " + req['body']['email'] + "\n\nMessage:\n" + req['body']['message']

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'betterBNBContact@gmail.com',
            pass: 'betterBNB1234'
        }
    });

    var mailOptions = {
        from: 'betterBNBContact@gmail.com',
        to: 'betterBNBContact@gmail.com',
        subject: 'Contact Form Subject: ' + req['body']['subject'],
        text: message
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    
})


app.post('/downloadPDF', function(req, res) {
    var doc = new jsPDF()
    doc.text(req.body.title, 10, 10)
    doc.save('listingPage.pdf')
})


if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));
    app.use('*', express.static('client/build'));

    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname,"client", "build", "index.html"))
    });
}


app.listen(port, () => { 
    console.log(`Server is running on port: ${port}`);
});
