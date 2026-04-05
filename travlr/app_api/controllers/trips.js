const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // register model
const Model = mongoose.model('trips'); // retrieve model

// Get /trips list of trips
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
    findTripByCode
};
