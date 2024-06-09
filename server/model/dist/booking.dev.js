"use strict";

var mongoose = require('mongoose'); // Define the booking schema


var bookingSchema = new mongoose.Schema({
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // Reference to the Rider user model
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // Reference to the Customer user model
    required: true
  },
  status: {
    type: String,
    "enum": ['pending', 'accepted', 'rejected'],
    "default": 'pending'
  },
  tripDetails: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
}); // Create the Booking model

var Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;