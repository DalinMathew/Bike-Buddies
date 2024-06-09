const mongoose = require('mongoose');

const tripUpdateSchema = new mongoose.Schema({
  trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const TripUpdate = mongoose.model('TripUpdate', tripUpdateSchema);

module.exports = TripUpdate;
