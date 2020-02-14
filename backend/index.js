const sslRedirect = require('heroku-ssl-redirect');   
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
app.use(sslRedirect());

app.use(cors());
app.use(express.json());

/*
const contactRouter = require('./routes/contact-form');
const contentRouter = require('./routes/content-form');

app.use('/api/contact-form', contactRouter);
app.use('/api/content-form', contentRouter);
*/

/* Database connection code */
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = "mongodb+srv://Sunil:icKxYzHJ1chT3M1H@cluster0-94hkc.gcp.mongodb.net/test?retryWrites=true&w=majority"
const dbName = "BetterBNB";

//Create a new MongoClient
const client = new  MongoClient(url);

client.connect(function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
  
    const db = client.db(dbName);
  
    const col = db.collection('Users').find({}).toArray(function(err, result){
        if (err) throw err;
        console.log(result);
        //db.close();   

    });
    
  });





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
