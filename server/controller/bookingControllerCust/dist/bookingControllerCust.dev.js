"use strict";

var express = require('express');

var router = express.Router();

var Bike = require('../../model/bike');

var BikeBooking = require('../../model/bookingCustomer');

var _require = require('express-validator'),
    validationResult = _require.validationResult;

var User = require('../../model/userModel');

var Trip = require('../../model/trip'); // Route to search for available bikes based on location, date, and preferences


var availabileBikes = function availabileBikes(req, res) {
  var _req$query, location, date, preferences, availableBikes, riderId;

  return regeneratorRuntime.async(function availabileBikes$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // Implement logic to search for available bikes based on location, date, and preferences
          // For example:
          _req$query = req.query, location = _req$query.location, date = _req$query.date, preferences = _req$query.preferences;
          _context.next = 4;
          return regeneratorRuntime.awrap(Bike.find({
            location: location,
            available: true
          }));

        case 4:
          availableBikes = _context.sent;
          riderId = availableBikes.map(function (e) {
            return e.rider;
          });
          console.log(riderId); // Filter available bikes based on other criteria if needed

          res.json(availableBikes);
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Server error'
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

var getBookingByCustId = function getBookingByCustId(req, res) {
  var id, availableBikes, completedTrip, BikeId, Bikes, riderId, Rider;
  return regeneratorRuntime.async(function getBookingByCustId$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id; // Implement logic to search for available bikes based on location, date, and preferences
          // For example:
          // const { location, date, preferences } = req.body;
          // cutomerbooks = await 

          _context2.next = 4;
          return regeneratorRuntime.awrap(BikeBooking.find({
            customer: id
          }));

        case 4:
          availableBikes = _context2.sent;
          console.log(availableBikes);

          if (!(availableBikes.length > 0)) {
            _context2.next = 22;
            break;
          }

          _context2.next = 9;
          return regeneratorRuntime.awrap(Trip.find({
            customer: id
          }));

        case 9:
          completedTrip = _context2.sent;
          console.log(completedTrip);
          BikeId = availableBikes.map(function (e) {
            return e.bike;
          });
          _context2.next = 14;
          return regeneratorRuntime.awrap(Bike.find({
            _id: BikeId
          }));

        case 14:
          Bikes = _context2.sent;
          riderId = Bikes.map(function (e) {
            return e.rider;
          }); // console.log(Bikes)

          _context2.next = 18;
          return regeneratorRuntime.awrap(User.find({
            _id: riderId
          }));

        case 18:
          Rider = _context2.sent;
          // console.log(Rider)
          res.json({
            availableBikes: availableBikes,
            Bikes: Bikes,
            Rider: Rider,
            completedTrip: completedTrip
          });
          _context2.next = 23;
          break;

        case 22:
          res.status(201).json({
            message: "You have'nt Booked Any Bike"
          });

        case 23:
          _context2.next = 29;
          break;

        case 25:
          _context2.prev = 25;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            message: 'Server error'
          });

        case 29:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 25]]);
}; // Route to book a bike


var custBooking = function custBooking(req, res) {
  var errors, _req$body, customerId, bikeId, pickUpLocation, destination, tripDate, tripDuration, luggageOption, riderId, booking;

  return regeneratorRuntime.async(function custBooking$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          // Validate request body
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context3.next = 4;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 4:
          // console.log(req.body);
          // Create a new bike booking
          _req$body = req.body, customerId = _req$body.customerId, bikeId = _req$body.bikeId, pickUpLocation = _req$body.pickUpLocation, destination = _req$body.destination, tripDate = _req$body.tripDate, tripDuration = _req$body.tripDuration, luggageOption = _req$body.luggageOption, riderId = _req$body.riderId;
          console.log(riderId);
          booking = new BikeBooking({
            rider: riderId,
            customer: customerId,
            bike: bikeId,
            pickUpLocation: pickUpLocation,
            tripDate: tripDate,
            destination: destination,
            tripDuration: tripDuration,
            luggageOption: luggageOption
          });
          _context3.next = 9;
          return regeneratorRuntime.awrap(booking.save());

        case 9:
          // Update bike availability status
          // await Bike.findByIdAndUpdate(bikeId, { available: false });
          res.status(201).json({
            message: 'Bike booked successfully'
          });
          _context3.next = 16;
          break;

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).json({
            message: 'Server error'
          });

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

module.exports = {
  availabileBikes: availabileBikes,
  custBooking: custBooking,
  getBookingByCustId: getBookingByCustId
};