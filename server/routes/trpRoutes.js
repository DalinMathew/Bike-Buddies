const express = require('express');
const router = express.Router();
const { createTrip, updateTripStatus, getTripHistory, provideTripUpdate } = require('../controller/TripController/tripController');

// Route to create a new trip
router.post('/trips', createTrip);

// Route to update trip status
router.put('/trips/:id/status', updateTripStatus);

// Route to fetch trip history
router.get('/history/:id', getTripHistory);

// Route to provide update during journey
router.post('/trips/:id/updates', provideTripUpdate);

module.exports = router;
