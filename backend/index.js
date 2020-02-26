//const sslRedirect = require('heroku-ssl-redirect');   
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

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
                res.send(JSON.parse(data.toString())); 
            }
        });
    }
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
