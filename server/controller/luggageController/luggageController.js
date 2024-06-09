const express = require('express');
const router = express.Router();
const LuggageOption = require('../../model/luggage');

// Create a new luggage option
const createLuggageOption =  async (req, res) => {
  try {
    const { name, description, price,luggageOption } = req.body;
    // const luggageOption = new LuggageOption({ name, description, price });
    await luggageOption.save();
    res.status(201).json(luggageOption);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all luggage options
const getAllLuggageOptions =  async (req, res) => {
  try {
    const luggageOptions = await LuggageOption.find();
    res.json(luggageOptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {createLuggageOption,getAllLuggageOptions};
