const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../server/User');
const OAuth2Data = require('../google_key.json');
const CLIENT_ID = OAuth2Data.client.id;
const CLIENT_SECRET = OAuth2Data.client.secret;
const AUTH_REDIRECT = OAuth2Data.client.redirect;

const strategy = new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: AUTH_REDIRECT
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ 'google.id' : id}, (err, userMatch) => {
        if (err) {
            return cb(null, false);
        } else if (userMatch) {
            return cb(null, userMatch);
        }
        const newGoogleUser = new User({
            'google.id': id,
            firstName: 'John',
            lastName: 'Doe'
        })

        newGoogleUser.save((err, savedUser) => {
            if (err) {
                console.log("couldn't save google user");
                return cb(null, false)
            } else {
                return cb(null, savedUser);
            }
        })
    })
  }
);

module.exports = strategy;
