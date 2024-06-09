const Bike = require('../../model/bike');
const BikeBooking = require('../../model/bookingCustomer');
const LuggageOption = require('../../model/luggage');
const Trip = require('../../model/trip');
const User = require('../../model/userModel');
const { ObjectId } = require('mongoose').Types;

const getBikes = async (req, res) => {
  try {
    // let riderId = availableBikes.map(e => e.rider)
    const pendingBookings = await BikeBooking.find();
const today = new Date();
const isoString = today.toISOString().slice(0, 10);
console.log(isoString);

const todaysBookings = pendingBookings.filter(booking => 
  booking.tripDate.toISOString().slice(0, 10) === isoString
);
console.log(todaysBookings);

// Extract unique rider IDs from today's bookings
const riderIds = [...new Set(todaysBookings.map(booking => booking.rider.toString()))];     
const rId = riderIds
console.log(rId)
const completed = await Trip.find({rider:rId, status:'Completed'})
console.log(completed.length)

// Update the availability of the bikes
if(completed.length<1){
  if (riderIds.length > 0) {
    await Bike.updateMany({ rider:rId, available: false });
  }
}
const availableBikes = await Bike.find({ available: true });
res.json(availableBikes);

// Find and return available bikes

  } catch (error) {
    console.error('Error fetching bikes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getBikeById = async (req, res) => {
  try {
    const bikeId  = req.params.id
    const bike = await Bike.findById(bikeId);
    if (!bike) {
      return res.status(404).json({ error: 'Bike not found' });
    }
    res.json(bike);
  } catch (error) {
    console.error('Error fetching bike by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addBike = async (req, res) => {
  console.log(req.file)
  console.log(req.body)
  try {
    const { rider,name, type,description, price, luggageOptions } = req.body;
    const riderinfo = await User.find({_id:rider})
    const riderIdPRoof = riderinfo[0].photo2
    console.log('Luggage options received:', luggageOptions);

    const newBike = new Bike({ rider,name, type,description, price,riderIdPRoof, image:req.file.filename, luggageOptions });
    await newBike.save();
    res.json({ message: 'Bike added successfully' });
  } catch (error) {
    console.error('Error adding bike:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





module.exports = {
   getBikes,
   addBike,
   getBikeById
  }