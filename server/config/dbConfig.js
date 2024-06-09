// require('dotenv').config(); // Load environment variables from .env file

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/BikeBooking");

const connection = mongoose.connection;

connection.on('connected', () => {
    console.log('Mongo db connected successfully');
})

connection.on('error', (err) => {
    console.log('Mongo db connection error: ', err);
})

module.exports = mongoose;