const express = require('express');
const router = express.Router();
const { createFeedback, getFeedbackForRider, respondToFeedback ,getAllFeedback} = require('../controller/feedbackController/feedbackController');
// const {createFeedback,getFeedbackByRiderId} = require('../controller/custFeedback/custFeedback')

// Route to create feedback
router.post('/', createFeedback);

// Route to get feedback for a rider
router.get('/feedback/:riderId', getFeedbackForRider);

router.get('/all',getAllFeedback)

// Route to respond to feedback
router.put('/feedback/:id/respond', respondToFeedback);

module.exports = router;
