const User = require('../server/User');
const regularStrategy = require('passport-local').Strategy

const localStrategy = new localStrategy(
    function(username, password, done) {
        User.findOne({ 'regularLogin.username': username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.checkPassword(password)) {
              return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
          });
    }
)