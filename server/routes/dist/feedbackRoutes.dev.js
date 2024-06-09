"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controller/feedbackController/feedbackController'),
    createFeedback = _require.createFeedback,
    getFeedbackForRider = _require.getFeedbackForRider,
    respondToFeedback = _require.respondToFeedback,
    getAllFeedback = _require.getAllFeedback; // const {createFeedback,getFeedbackByRiderId} = require('../controller/custFeedback/custFeedback')
// Route to create feedback


router.post('/', createFeedback); // Route to get feedback for a rider

router.get('/feedback/:riderId', getFeedbackForRider);
router.get('/all', getAllFeedback); // Route to respond to feedback

router.put('/feedback/:id/respond', respondToFeedback);
module.exports = router;