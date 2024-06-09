// tripRoutes.js
const express = require('express');
const router = express.Router();
const Trip = require('../../model/trip');
const TripUpdate = require('../../model/TripUpdate');
const User = require('../../model/userModel');
const BikeBooking = require('../../model/bookingCustomer');
const Bike = require('../../model/bike');

// Create a new trip
const createTrip =  async (req, res) => {
  try {
    console.log(req.body)
    const { riderId, customerId,status, tripDate,bookingId} = req.body;
    const trip = new Trip({ rider: riderId, customer: customerId,status:status,startTime:tripDate,bookingId:bookingId });
    await BikeBooking.findOneAndUpdate(
      { rider: riderId, customer: customerId, tripDate: tripDate },
      { $set: { trip: trip._id } }
    );
    await trip.save();
    res.status(201).json(trip);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Server error' });
  }
};

// Update trip status
const updateTripStatus =  async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const {riderId } = req.body
    if(status == 'Completed'){
      await Bike.updateMany({ rider:  riderId }, { available: true });
      const trip = await Trip.findByIdAndUpdate(id, { status }, { new: true });
      res.json(trip);
    }
    else{
      const trip = await Trip.findByIdAndUpdate(id, { status }, { new: false });
      res.json(trip);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch trip history
const getTripHistory = async (req, res) => {
  try {
    const riderId  = req.params.id;
    // console.log(riderId)

    const trips = await Trip.find({ rider: riderId });
    if (trips.length > 0) {
      const customerIds = [...new Set(trips.map(trip => trip.customer))];
      const user = await User.find({ _id: { $in: customerIds } });

      const booking = await BikeBooking.find({ rider: riderId,status:'accepted' });

      const bikeIds = booking.map(booking => booking.bike);
      const bike = await Bike.find({ _id: { $in: bikeIds } });

      res.json({ trips, user, booking, bike });
    } else {
      res.status(200).json({ message: 'No trips found for this rider' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Provide update during journey
const provideTripUpdate =  async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const update = new TripUpdate({ trip: id, message });
    await update.save();
    res.status(201).json(update);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {createTrip,updateTripStatus,getTripHistory,provideTripUpdate};
