// bring in DB connection and trip schema
const mongoose = require('./db');
const Trip = require('./travlr');

// read seed data from JSON file
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// delete any existing trips, then create new ones using the seed data
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
    console.log("Database seeded!");
};

// close the connection when done
seedDB().then(async () => {
    await mongoose.connection.close();
    console.log("Connection closed!");
    process.exit(0);
});