"use strict";

var express = require('express');

var auth = require('../middleware/auth');

var router = express.Router();

var _require = require('../controller/bikeController/bikeController'),
    getBikes = _require.getBikes,
    getBikeById = _require.getBikeById,
    addBike = _require.addBike;

var upload = require('../middleware/multer'); // Route to fetch all bikes


router.get('/bikeList', getBikes);
router.get('/:id', getBikeById); // Route to add a new bike
// router.post('/',auth, addBike);

router.post('/add', upload.single('image'), addBike);
module.exports = router;