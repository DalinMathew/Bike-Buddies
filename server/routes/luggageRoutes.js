const express = require('express');
const router = express.Router();
const {createLuggageOption,getAllLuggageOptions} = require('../controller/luggageController/luggageController');

// Route to create a new luggage option
router.post('/luggage-options', createLuggageOption);

// Route to get all luggage options
router.get('/luggage-options', getAllLuggageOptions);

module.exports = router;
