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
