const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // register model
const Model = mongoose.model('trips'); // retrieve model

// PUT /trips/:tripCode - update a trip by code
// regardless of outcome, response must include html status code 
// and a JSON object with either the updated trip or an error message

const tripsUpdateTrip = async (req, res) => {

    // uncomment for debugging
    // console.log('Updating trip with code: ' + req.params.tripCode);
    // console.log('Request body: ' + JSON.stringify(req.body));

    const q = await Model.findOneAndUpdate(
        { code: req.params.tripCode }, // filter
        {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        }, // update
        { new: true } // options - return the updated document
    ).exec();

    if (!q) {
        // database returned no data - something went wrong
        return res.status(400)
            .json({ error: 'Unable to update trip' });
    } else {
        // successfully updated trip
        return res.status(201)
            .json(q);  // return the updated trip
    }

    // uncomment for debugging
    // console.log('Updated trip: ' + JSON.stringify(q));

};



// POST /trips - add a new trip
const tripsAddTrip = async (req, res) => {
    const newTrip = {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    };

    const q = await Model.create(newTrip);

    if (!q) {
        // database returned no data - something went wrong
        return res.status(400)
            .json(err);
    } else {
        // successfully created new trip
        return res.status(201)
            .json(q);  // return the newly created trip
    }
};

// GET /trips list of trips
const tripsList = async (req, res) => {
    const q = await Model.find({}).exec();

    if (!q) {
        return res.status(404).json({ error: 'No trips found' });
    } else {
        return res.status(200).json(q);
    }
};


// GET: /trips/:tripCode - returns a single trip by code
const findTripByCode = async (req, res) => {
    const q = await Model
        .find({'code': req.params.tripCode})
        .exec();

    if (!q || q.length === 0) {
        return res.status(404).json({ error: 'Trip not found' });
    } else {
        return res.status(200).json(q[0]);
    }
};

module.exports = {
    tripsList,
    findTripByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
