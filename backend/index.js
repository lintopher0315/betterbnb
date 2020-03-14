//const sslRedirect = require('heroku-ssl-redirect');   
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const nodemailer = require('nodemailer');
const OAuth2Data = require('./google_key.json')
const passport = require('passport');
const GoogleStrategy = require('./passport/GoogleStrategy');
const LocalStrategy = require('./passport/LocalStrategy');
const User = require('./server/User');


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
const client = new  MongoClient(MONGO_URL, {useUnifiedTopology: true});

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


/**
 * This route is an API endpoint for the services to call
 * that will return information about the specified 
 * AirBNB listing. If the request does not include
 * a listing url, it simply redirects to the dashboard
 * 
 */
app.get('/api/report', function(req, res) {
    let listing_url = req.headers.url; 
    if (listing_url === undefined) {
        res.redirect(REDIRECT_URL)
    } 
    else { // call the necessary Python scripts
        const spawn = require("child_process").spawn;
        const pythonProcess = spawn('python3',["scripts/api-handler.py", listing_url]);


        pythonProcess.stdout.on('data', (data) => {
            // Do something with the data returned from python script
            if (data.toString() !== "error") {
                // process the text file
                console.log(data.toString());
		res.send(JSON.parse(data.toString())); 
            }
        });
    }
})

//Google Login Authentication
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

passport.use(GoogleStrategy);
passport.use(LocalStrategy);

passport.serializeUser(function(user, cb) {
    console.log("here");
    console.log(user)
    cb(null, user);
});
  
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
    console.log("here2");
});

// Route that receives a GET request to /auth/google
app.get('/login/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
  function(req, res) {
    res.redirect('http://localhost:3000');
  });

app.get('/logout/google', function(req, res) {
    console.log("logged out!");
    req.logout();
    res.redirect('http://localhost:3000/login');
});


//Route that recieves a POST request to /email
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
