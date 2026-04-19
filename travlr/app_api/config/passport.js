const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { User } = require('../models/user'); // register model and retrieve User

// Configure the local strategy for use by Passport.
passport.use(new LocalStrategy(
    { usernameField: 'email' }, // use email instead of username
    async (username, password, done) => {
        const q = await User.findOne({email: username}).exec();

        if (!q) {
            // user not found
            return done(null, false, { message: 'Incorrect email.' });
        }
        if (!q.validPassword(password)) {
            // password is incorrect
            return done(null, false, { message: 'Incorrect password.' });
        }
        // authentication successful
        return done(null, q);
    }   
));