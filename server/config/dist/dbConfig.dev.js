"use strict";

// require('dotenv').config(); // Load environment variables from .env file
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/BikeBooking");
var connection = mongoose.connection;
connection.on('connected', function () {
  console.log('Mongo db connected successfully');
});
connection.on('error', function (err) {
  console.log('Mongo db connection error: ', err);
});
module.exports = mongoose;