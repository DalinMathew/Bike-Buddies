const mongoose = require('mongoose');

// Define the booking schema
const bookingSchema = new mongoose.Schema({
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the Rider user model
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the Customer user model
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  tripDetails: {
    type: String,
    required: true
  },
  luggageOptions: {type:String,required:true}, // Array of luggage objects
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Booking model
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
