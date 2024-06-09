"use strict";

var mongoose = require('mongoose');

var luggageOptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  }
});
var LuggageOption = mongoose.model('LuggageOption', luggageOptionSchema);
module.exports = LuggageOption;