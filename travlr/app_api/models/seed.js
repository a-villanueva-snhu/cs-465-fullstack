// The seed script populates the MongoDB database with 
// initial test data from a JSON file.

// bring in DB connection and trip schema
const mongoose = require('./db');
const Trip = require('./travlr');

// read seed data from JSON file
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// Only seed if database is empty - do NOT delete existing data
const seedDB = async () => {
    const count = await Trip.countDocuments({});
    
    if (count === 0) {
        await Trip.insertMany(trips);
        console.log("Database seeded with initial test data!");
    } else {
        console.log(`Database already contains ${count} trips. Skipping seed.`);
    }
};

// close the connection when done
seedDB().then(async () => {
    await mongoose.connection.close();
    console.log("Connection closed!");
    process.exit(0);
});