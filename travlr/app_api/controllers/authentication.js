const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user').User; // retrieve model  

const registerUser = async (req, res) => {
    if (!req.body.email || !req.body.name || !req.body.password) {
        return res.status(400).json({ error: 'All fields required' });
    }

    const user = new User(
        {
            email: req.body.email,  // set email from request body
            name: req.body.name,    // set name from request body
            password: ''            // placeholder for password - will be set by setPassword method
        }
    );

    user.setPassword(req.body.password); // set password using the setPassword method
    const q = await user.save(); // save the user to the database

    if (!q) {
        // database returned no data - something went wrong
        return res.status(400)
            .json({ error: 'Unable to register user' });
    } else {
        // successfully registered user
        return res.status(200)
            .json({ token: user.generateJWT() });  // return a JWT for the new user
    }
};

const loginUser = (req, res) => {
    // validate message to send if email or password is missing
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ error: 'All fields required' });
    }

    // delegate authentication to Passport's local strategy
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            // an error occurred during authentication
            return res.status(400).json(err);
        }
        if (user) {
            const token = user.generateJWT();
            res
                .status(200)
                .json({token});
            } else { // Auth failed return error
            res
                .status(401)
                .json(info);
            }
        })(req, res);
};

module.exports = {
    registerUser,
    loginUser
};