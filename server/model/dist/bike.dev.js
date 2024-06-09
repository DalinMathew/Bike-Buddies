"use strict";

var mongoose = require('mongoose');

var bikeSchema = new mongoose.Schema({
  name: String,
  type: String,
  description: String,
  price: Number,
  image: String,
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  riderIdPRoof: {
    type: String
  },
  available: {
    type: Boolean,
    "default": true
  },
  luggageOptions: {
    type: String,
    required: true
  } // Array of luggage objects

});
var Bike = mongoose.model('Bike', bikeSchema);
module.exports = Bike;