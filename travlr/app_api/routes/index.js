const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// API routes

// route for trips list
router.route("/trips").get(tripsController.tripsList);

// route for trips by code
router
    .route("/trips/:tripCode")
    .get(tripsController.findTripByCode);


module.exports = router;