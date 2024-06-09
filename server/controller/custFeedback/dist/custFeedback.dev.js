// const express = require('express');
// const router = express.Router();
// const Feedback = require('../models/Feedback');
// // Create feedback
// const createFeedback =  async (req, res) => {
//   try {
//     const { riderId, customerId, rating, comment } = req.body;
//     const feedback = new Feedback({ rider: riderId, customer: customerId, rating, comment });
//     await feedback.save();
//     res.status(201).json(feedback);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
// // Get feedback for a specific rider
// const getFeedbackByRiderId =  async (req, res) => {
//   try {
//     const { riderId } = req.params;
//     const feedback = await Feedback.find({ rider: riderId }).populate('customer');
//     res.json(feedback);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
// module.exports = {createFeedback,getFeedbackByRiderId};
"use strict";