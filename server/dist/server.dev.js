"use strict";

var express = require("express");

var dbConfig = require("./config/dbConfig");

var path = require('path');

var mongoose = require('mongoose');

var app = express();

var cors = require('cors'); // require("dotenv").config();


app.use(express.json());

var user = require('./routes/user');

var bikeRoutes = require('./routes/bike');

var custBooking = require('./routes/bookingRoutesCustomer');

var riderViewBookings = require('./routes/bookingRoutesRider');

var tripRoutes = require('./routes/trpRoutes');

var feedbackRoutes = require('./routes/feedbackRoutes');

var luggageRoutes = require('./routes/luggageRoutes');

var auth = require('./middleware/auth'); // const fileUpload = require('express-fileupload')
// app.use(
//   fileUpload({
//     debug: true,
//     createParentPath: true,
//     safeFileNames: true,
//     preserveExtension: 4
//   })
// )
// mongoose
//   .connect(process.env.MONGODB_ATLAS_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // useCreateIndex: true,
//     // useFindAndModify: false
//   })
//   .then(() => {
//     console.log('connected to MongoDB')
//   })
//   .catch((error) => {
//     console.log('error connection to MongoDB:', error.message)
//   })


var publicDirectoryPath = path.join(__dirname, './view');
app.use(express["static"](publicDirectoryPath));
app.use('/media', express["static"](path.join(__dirname, 'media')));
app.use('/course-file', express["static"]('course-file'));
app.use(cors());
app.use('/users', user);
app.use('/bikes', bikeRoutes);
app.use('/customer', custBooking);
app.use('/rider', riderViewBookings);
app.use('/trips', tripRoutes);
app.use('/feedbacks', feedbackRoutes);
app.use('/luggage', luggageRoutes);
var port = process.env.port || 9000;
app.listen(port, function () {
  return console.log("Node JS server listening on port ".concat(port));
});