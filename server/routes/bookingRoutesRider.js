const express = require('express');
// const auth = require('../middleware/auth')
const router = express.Router();
const {bookings,acceptBookingById,rejectBookingById,CustCommuniation,getAllBookings} = require('../controller/bookingControllers/bookingControllerRider');

// Route to fetch all bikes

// Route to add a new bike
router.get('/',bookings)
router.put('/:id/accept', acceptBookingById);
router.get('/all',getAllBookings);
// router.get('/:id/booking',getBookingByRiderId)
router.put('/:id/reject',rejectBookingById)
router.post('/chat',CustCommuniation)

module.exports = router;
