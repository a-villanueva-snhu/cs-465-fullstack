const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// API routes

// route for trips endpoint
router
    .route("/trips")
    .get(tripsController.tripsList)  // GET method route for trips list
    .post(tripsController.tripsAddTrip); // POST method route for adding a new trip

// GET method route for trips by code - reuquires tripCode parameter
router
    .route("/trips/:tripCode")
    .get(tripsController.findTripByCode);

// PUT method routes - tripsUpdateTrip - requires tripCode parameter
router
    .route("/trips/:tripCode")
    .get(tripsController.findTripByCode)  // GET method route for trips by code - reuquires tripCode parameter
    .put(tripsController.tripsUpdateTrip); // PUT method route for updating a trip - requires tripCode parameter


    module.exports = router;