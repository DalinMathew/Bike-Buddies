const express = require('express');
const router = express.Router();
const User = require('../../model/userModel')
const Feedback = require('../../model/Feedback');

// Create feedback
const createFeedback =  async (req, res) => {
  try {
    const { riderId, customerId, rating, comment,role,destination,tripdate } = req.body;
    const feedback = new Feedback({ rider: riderId, customer: customerId, rating, comment,role,destination,tripdate });
    await feedback.save();
    res.status(201).json({ success: true, message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get feedback for a rider
const getFeedbackForRider = async (req, res) => {
  try {
    const { riderId } = req.params;
    const feedback = await Feedback.find({ rider: riderId });
    const rider = await User.find({_id:riderId})
    let custId = feedback.map((e) =>e.customer)
    let customer  = await User.find({_id:{$in:custId}})
    // console.log("Customer",customer);
    res.json({feedback,customer,rider});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getAllFeedback =async (req,res) => {
  try{
    const Allfeedback = await Feedback.find()
    // console.log("Allfedback",Allfeedback);
    let allRiderId = Allfeedback.map((e) => e.rider)
    let AllCustomerId = Allfeedback.map((e) => e.customer)
    const AllCustomer = await User.find({_id:{$in:AllCustomerId}})
    const allRider = await User.find({_id:{$in:allRiderId}})
    console.log("AllRider",AllCustomer)
    res.json({Allfeedback,AllCustomer,allRider})
  }catch(error){
    console.log(error)
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Respond to feedback
const respondToFeedback =  async (req, res) => {
  try {
    const { id } = req.params;
    const { response } = req.body;
    const feedback = await Feedback.findByIdAndUpdate(id, { responded: true, response }, { new: true });
    res.json({ success: true, message: 'Feedback response updated successfully', feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {createFeedback,getFeedbackForRider,respondToFeedback,getAllFeedback};
