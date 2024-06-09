const express = require('express');
const BikeBooking = require('../../model/bookingCustomer');
const Booking = require('../../model/bookingRiders');
const User = require('../../model/userModel');
const Bike = require('../../model/bike');

// Route to get all incoming booking requests

const getAllBookings = async (req,res) => {
  try{
    const allBookings = await BikeBooking.find()
    // const 
    const riderIds = allBookings.map(e => e.rider);
    const customerIds = allBookings.map(e => e.customer);
    const bikeIds = allBookings.map(e => e.bike);

    const bikes = await Bike.find({ _id: { $in: bikeIds } });
    const customers = await User.find({ _id: { $in: customerIds } });
    const riders = await User.find({ _id: { $in: riderIds } });

    const combinedData = allBookings.map(booking => {
      const bike = bikes.find(bike => bike._id.equals(booking.bike));
      const customer = customers.find(customer => customer._id.equals(booking.customer));
      const rider = riders.find(rider => rider._id.equals(booking.rider));

      
      return {
          bookingId: booking._id,
          status: booking.status,
          pickUpLocation:booking.pickUpLocation,
          destination:booking.destination,
          tripDate:booking.tripDate,
          tripDuration:booking.tripDuration,
          riderId: booking.rider,
          customer: {
              id: customer._id,
              name: customer.name,
              email: customer.email,
              mobile:customer.mobile,
              age:customer.age
          },
          rider: {
            id: rider._id,
            name: rider.name,
            email: rider.email,
            mobile: rider.mobile,
            age:rider.age
        },
          bike: {
              id: bike._id,
              name:bike.name,
              type: bike.type,
              price:bike.price,
              image:bike.image,
              riderIdPRoof: bike.riderIdPRoof,
          }
      }; 
  });
  console.log(combinedData)

    if(allBookings){
      res.status(200).json(combinedData)
    }else{
      res.status(404).json({message: 'No bookings found'})
    }
  }catch(error){
    res.status(500).json({ message: 'Server error' });
  }
}
const bookings =  async (req, res) => {
  console.log("getting")
  try {
    const bookings = await BikeBooking.find({ status: 'pending' })
    let riderId = bookings.map(e =>e.rider);
    console.log(riderId)
    let customerId = bookings.map(e => e.customer)
    let bikeId = bookings.map(e => e.bike)
    let bikes  = await Bike.find({_id:{$in:bikeId}})
    let customers = await User.find({_id:{$in:customerId}})
    // console.log(bikes) 
    res.json({bookings,customers,bikes});
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



// Route to accept a booking request
const acceptBookingById =  async (req, res) => {
  try {
    // req.params.id  
    let riderId = req.body.riderId
    const booking = await BikeBooking.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true });
    await Booking.create()
    const ridersBike = await Bike.find( {rider:riderId} )
    const today = new Date();
    const isoString = today.toISOString().slice(0, 10);
    console.log(isoString);
    // console.log(ridersBike)
    // if(isoString == booking.tripDate.toISOString().slice(0, 10)){
    // await Bike.updateMany({ rider: { $in: riderId },available:false });
    // }
    // if (!booking) {
    //   return res.status(404).json({ message: 'Booking not found' });
    // }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Route to reject a booking request
const rejectBookingById =  async (req, res) => {
  try {
    const booking = await BikeBooking.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    // await Bike.updateMany({ rider: { $in: riderId } }, { available: false });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Route to communicate with customer regarding trip details
const CustCommuniation =  async (req, res) => {
  try {
    // Implement communication logic with customer here
    res.json({ message: 'Communication sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {getAllBookings,bookings,acceptBookingById,rejectBookingById,CustCommuniation};
