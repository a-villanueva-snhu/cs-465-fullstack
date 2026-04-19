const express = require('express');
// const { authenticateJWT } = require('../config/jwt');  // Became function in this file for simplicity
const router = express.Router();

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

const jwt = require('jsonwebtoken');

// Method to authenticate JWT for protected routes
function authenticateJWT(req, res, next) {
    console.log('In Middleware - authenticateJWT');
    const authHeader = req.headers['authorization'];

    if (authHeader == null) {
        console.log('No auth header!');
        return res.status(401).json({"message": "No authorization header provided"});
    }

    let headers = authHeader.split(' ');
    if (headers.length < 2) {
        console.log('Invalid auth header format!');
        return res.status(400).json({"message": "Invalid authorization header format"});
    }

    const token = headers[1]; // Bearer <token>
    console.log('Token: ' + token);

    if (token == null) {
        console.log('No token provided!');
        return res.status(401).json({"message": "No token provided"});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('Invalid token!');
            return res.status(403).json({"message": "Invalid token"});
        }

        req.auth = decoded; // Store the decoded token payload in req.auth for use in route handlers
        next();
    });
}

/// API routes ///
// Authentication routes
router.route('/register').post(authController.registerUser);
router.route('/login').post(authController.loginUser);

// Trips endpoint routes
router
    .route('/trips')
    .get(tripsController.tripsList)  // GET is public, no auth required
    .post(authenticateJWT, tripsController.tripsAddTrip);

// Trip by code endpoint routes
router
    .route('/trips/:tripCode')
    .get(tripsController.findTripByCode)  // GET is public, no auth required
    .put(authenticateJWT, tripsController.tripsUpdateTrip)
    .post(authenticateJWT, tripsController.tripsAddTrip) // Allow adding new trip with POST to /trips/:tripCode
    .delete(authenticateJWT, tripsController.tripsDeleteTrip);

// CRUD routes for users (admin only)

// UNIMPLEMENTED - for future admin user management features
// router
//     .route('/users')
//     .get(authenticateJWT, authController.listUsers)
//     .post(authController.registerUser); // Allow registration without auth for simplicity

// router
//     .route('/users')
//     .get(authenticateJWT, authController.listUsers)
//     .post(authController.registerUser); // Allow registration without auth for simplicity

// router
//     .route('/users/:username')
//     .get(authenticateJWT, authController.getUser)
//     .put(authenticateJWT, authController.updateUser)
//     .delete(authenticateJWT, authController.deleteUser);

module.exports = router;