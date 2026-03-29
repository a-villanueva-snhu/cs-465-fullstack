var fs = require('fs');
var meals = JSON.parse(fs.readFileSync('./data/meals.json', 'utf8'))

/* Get Meals View */
const mealsController = (req, res) => {
    res.render('meals', { title: 'Travlr Getaways', meals });
};

module.exports = {
    mealsController
};