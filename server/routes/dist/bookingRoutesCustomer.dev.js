"use strict";

var express = require('express'); // const auth = require('../middleware/auth')


var router = express.Router();

var _require = require('../controller/bookingControllerCust/bookingControllerCust'),
    availabileBikes = _require.availabileBikes,
    custBooking = _require.custBooking,
    getBookingByCustId = _require.getBookingByCustId; // Route to fetch all bikes
// Route to add a new bike


router.get('/available', availabileBikes);
router.get('/booking/:id', getBookingByCustId);
router.post('/bookings', custBooking);
module.exports = router;