"use strict";

var express = require('express'); // const auth = require('../middleware/auth')


var router = express.Router();

var _require = require('../controller/bookingControllers/bookingControllerRider'),
    bookings = _require.bookings,
    acceptBookingById = _require.acceptBookingById,
    rejectBookingById = _require.rejectBookingById,
    CustCommuniation = _require.CustCommuniation,
    getAllBookings = _require.getAllBookings; // Route to fetch all bikes
// Route to add a new bike


router.get('/', bookings);
router.put('/:id/accept', acceptBookingById);
router.get('/all', getAllBookings); // router.get('/:id/booking',getBookingByRiderId)

router.put('/:id/reject', rejectBookingById);
router.post('/chat', CustCommuniation);
module.exports = router;