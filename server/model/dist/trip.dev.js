"use strict";

var mongoose = require('mongoose');

var tripSchema = new mongoose.Schema({
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rider',
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  status: {
    type: String,
    "enum": ['pending', 'ongoing', 'completed'],
    "default": 'pending'
  },
  startTime: {
    type: String
  },
  endTime: Date,
  tripUpdates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TripUpdate'
  }]
});
var Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;