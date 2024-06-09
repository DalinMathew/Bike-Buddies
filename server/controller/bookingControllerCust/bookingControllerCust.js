const express = require('express');
const router = express.Router();
const Bike = require('../../model/bike');
const BikeBooking = require('../../model/bookingCustomer');

const { validationResult } = require('express-validator');
const User = require('../../model/userModel');
const Trip = require('../../model/trip');
// Route to search for available bikes based on location, date, and preferences
const availabileBikes  =  async (req, res) => {
  try {
    // Implement logic to search for available bikes based on location, date, and preferences
    // For example:
    const { location, date, preferences } = req.query;
    const availableBikes = await Bike.find({ location, available: true });
    let riderId = availableBikes.map(e => e.rider)

    console.log(riderId);
    // Filter available bikes based on other criteria if needed
    res.json(availableBikes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getBookingByCustId = async (req,res) => {
  try {
    let id = req.params.id;
    // Implement logic to search for available bikes based on location, date, and preferences
    // For example:

    
    // const { location, date, preferences } = req.body;
    // cutomerbooks = await 
    const availableBikes = await BikeBooking.find({customer:id});
    console.log(availableBikes)
    if(availableBikes.length>0){
      const completedTrip = await Trip.find({customer:id})
      console.log(completedTrip)
      let BikeId = availableBikes.map(e => e.bike)
      const Bikes = await Bike.find({_id:BikeId});
      let riderId = Bikes.map(e => e.rider)
      // console.log(Bikes)
      let Rider = await User.find({_id:riderId})
      // console.log(Rider)
      res.json({availableBikes,Bikes,Rider,completedTrip});
    }
    else{
      res.status(201).json({ message: "You have'nt Booked Any Bike", });

    }
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// Route to book a bike
    const custBooking =  async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    // console.log(req.body);
    // Create a new bike booking
    const { customerId, bikeId, pickUpLocation,destination, tripDate, tripDuration,luggageOption,riderId } = req.body;
    console.log(riderId)
    const booking = new BikeBooking({
      rider:riderId,
      customer: customerId,
      bike: bikeId,
      pickUpLocation,
      tripDate,
      destination,
      tripDuration,
      luggageOption
    });
    await booking.save();

    // Update bike availability status
    // await Bike.findByIdAndUpdate(bikeId, { available: false });

    res.status(201).json({ message: 'Bike booked successfully', });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {availabileBikes,custBooking,getBookingByCustId};
