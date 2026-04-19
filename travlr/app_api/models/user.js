const { hash } = require('crypto');
const mongoose = require('mongoose');

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { set } = require('../../app');

const userSchema = new mongoose.Schema({
    email : { type: String, unique: true, required: true },
    name : { type: String, required: true },
    hash : { type: String, required: true },
    salt : { type: String, required: true }
});

// Methods for user schema - setPassword, validPassword, generateJWT
// setPassword - generates a salt and hash for the given password and stores them in the user document
userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}

// validPassword - checks if the given password is correct by hashing it with the stored salt and comparing it to the stored hash
userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
}

// generateJWT - generates a JSON Web Token for the user with an expiration date of 1 hour
userSchema.methods.generateJWT = function() {
    return jwt.sign({
        // payload
        _id: this._id,
        email: this.email,
        name: this.name,
    }, process.env.JWT_SECRET, { expiresIn: '1h' }); // secret key from environment variable
}

mongoose.model('users', userSchema);

const User = mongoose.model('users');

module.exports = {
    User
};
