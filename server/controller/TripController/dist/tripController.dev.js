"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// tripRoutes.js
var express = require('express');

var router = express.Router();

var Trip = require('../../model/trip');

var TripUpdate = require('../../model/TripUpdate');

var User = require('../../model/userModel');

var BikeBooking = require('../../model/bookingCustomer');

var Bike = require('../../model/bike'); // Create a new trip


var createTrip = function createTrip(req, res) {
  var _req$body, riderId, customerId, status, tripDate, bookingId, trip;

  return regeneratorRuntime.async(function createTrip$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log(req.body);
          _req$body = req.body, riderId = _req$body.riderId, customerId = _req$body.customerId, status = _req$body.status, tripDate = _req$body.tripDate, bookingId = _req$body.bookingId;
          trip = new Trip({
            rider: riderId,
            customer: customerId,
            status: status,
            startTime: tripDate,
            bookingId: bookingId
          });
          _context.next = 6;
          return regeneratorRuntime.awrap(BikeBooking.findOneAndUpdate({
            rider: riderId,
            customer: customerId,
            tripDate: tripDate
          }, {
            $set: {
              trip: trip._id
            }
          }));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(trip.save());

        case 8:
          res.status(201).json(trip);
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Server error'
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
}; // Update trip status


var updateTripStatus = function updateTripStatus(req, res) {
  var id, status, riderId, trip, _trip;

  return regeneratorRuntime.async(function updateTripStatus$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          status = req.body.status;
          riderId = req.body.riderId;

          if (!(status == 'Completed')) {
            _context2.next = 13;
            break;
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(Bike.updateMany({
            rider: riderId
          }, {
            available: true
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(Trip.findByIdAndUpdate(id, {
            status: status
          }, {
            "new": true
          }));

        case 9:
          trip = _context2.sent;
          res.json(trip);
          _context2.next = 17;
          break;

        case 13:
          _context2.next = 15;
          return regeneratorRuntime.awrap(Trip.findByIdAndUpdate(id, {
            status: status
          }, {
            "new": false
          }));

        case 15:
          _trip = _context2.sent;
          res.json(_trip);

        case 17:
          _context2.next = 23;
          break;

        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            message: 'Server error'
          });

        case 23:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 19]]);
}; // Fetch trip history


var getTripHistory = function getTripHistory(req, res) {
  var riderId, trips, customerIds, user, booking, bikeIds, bike;
  return regeneratorRuntime.async(function getTripHistory$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          riderId = req.params.id; // console.log(riderId)

          _context3.next = 4;
          return regeneratorRuntime.awrap(Trip.find({
            rider: riderId
          }));

        case 4:
          trips = _context3.sent;

          if (!(trips.length > 0)) {
            _context3.next = 20;
            break;
          }

          customerIds = _toConsumableArray(new Set(trips.map(function (trip) {
            return trip.customer;
          })));
          _context3.next = 9;
          return regeneratorRuntime.awrap(User.find({
            _id: {
              $in: customerIds
            }
          }));

        case 9:
          user = _context3.sent;
          _context3.next = 12;
          return regeneratorRuntime.awrap(BikeBooking.find({
            rider: riderId,
            status: 'accepted'
          }));

        case 12:
          booking = _context3.sent;
          bikeIds = booking.map(function (booking) {
            return booking.bike;
          });
          _context3.next = 16;
          return regeneratorRuntime.awrap(Bike.find({
            _id: {
              $in: bikeIds
            }
          }));

        case 16:
          bike = _context3.sent;
          res.json({
            trips: trips,
            user: user,
            booking: booking,
            bike: bike
          });
          _context3.next = 21;
          break;

        case 20:
          res.status(200).json({
            message: 'No trips found for this rider'
          });

        case 21:
          _context3.next = 27;
          break;

        case 23:
          _context3.prev = 23;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).json({
            message: 'Server error'
          });

        case 27:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 23]]);
}; // Provide update during journey


var provideTripUpdate = function provideTripUpdate(req, res) {
  var id, message, update;
  return regeneratorRuntime.async(function provideTripUpdate$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          message = req.body.message;
          update = new TripUpdate({
            trip: id,
            message: message
          });
          _context4.next = 6;
          return regeneratorRuntime.awrap(update.save());

        case 6:
          res.status(201).json(update);
          _context4.next = 13;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          res.status(500).json({
            message: 'Server error'
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

module.exports = {
  createTrip: createTrip,
  updateTripStatus: updateTripStatus,
  getTripHistory: getTripHistory,
  provideTripUpdate: provideTripUpdate
};