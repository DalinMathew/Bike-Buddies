const mongoose = require('mongoose');


// Define the bike booking schema
const bikeBookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the Customer user model
    required: true
  },
  trip:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip', // Reference to the Trip model
  },
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the Customer user model
    required: true
  },
  bike: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bike', // Reference to the Bike model
    required: true
  },
  pickUpLocation: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  tripDate: {
    type: Date,
    required: true
  },
  tripDuration: {
    type: Number, // Duration in hours or minutes
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  luggageOption: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

});

// Create the BikeBooking model
const BikeBooking = mongoose.model('BikeBooking', bikeBookingSchema);

module.exports = BikeBooking;
