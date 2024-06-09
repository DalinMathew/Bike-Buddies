const express = require('express');
const auth = require('../middleware/auth')
const router = express.Router();
const {getBikes, getBikeById,addBike} = require('../controller/bikeController/bikeController');
const upload = require('../middleware/multer');

// Route to fetch all bikes
router.get('/bikeList',getBikes);
router.get('/:id',getBikeById)

// Route to add a new bike
// router.post('/',auth, addBike);
router.post('/add',upload.single('image'), addBike);


module.exports = router;
