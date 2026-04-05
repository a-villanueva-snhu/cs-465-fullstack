const Trip = require('../models/travlr');

/* Get Travel View */
const travel = async (req, res) => {
    try {
        const trips = await Trip.find({});
        res.render('travel', { title: 'Travlr Getaways', trips });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { message: 'Error fetching trips' });
    }
};

module.exports = {
    travel
};