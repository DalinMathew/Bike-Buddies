const mongoose = require('mongoose');

const luggageOptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
});

const LuggageOption = mongoose.model('LuggageOption', luggageOptionSchema);

module.exports = LuggageOption;
