"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controller/luggageController/luggageController'),
    createLuggageOption = _require.createLuggageOption,
    getAllLuggageOptions = _require.getAllLuggageOptions; // Route to create a new luggage option


router.post('/luggage-options', createLuggageOption); // Route to get all luggage options

router.get('/luggage-options', getAllLuggageOptions);
module.exports = router;