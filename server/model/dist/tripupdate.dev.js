"use strict";

var mongoose = require('mongoose');

var tripUpdateSchema = new mongoose.Schema({
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    "default": Date.now
  }
});
var TripUpdate = mongoose.model('TripUpdate', tripUpdateSchema);
module.exports = TripUpdate;