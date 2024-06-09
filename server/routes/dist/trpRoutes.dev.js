"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controller/TripController/tripController'),
    createTrip = _require.createTrip,
    updateTripStatus = _require.updateTripStatus,
    getTripHistory = _require.getTripHistory,
    provideTripUpdate = _require.provideTripUpdate; // Route to create a new trip


router.post('/trips', createTrip); // Route to update trip status

router.put('/trips/:id/status', updateTripStatus); // Route to fetch trip history

router.get('/history/:id', getTripHistory); // Route to provide update during journey

router.post('/trips/:id/updates', provideTripUpdate);
module.exports = router;