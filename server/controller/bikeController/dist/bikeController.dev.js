"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var Bike = require('../../model/bike');

var BikeBooking = require('../../model/bookingCustomer');

var LuggageOption = require('../../model/luggage');

var Trip = require('../../model/trip');

var User = require('../../model/userModel');

var ObjectId = require('mongoose').Types.ObjectId;

var getBikes = function getBikes(req, res) {
  var pendingBookings, today, isoString, todaysBookings, riderIds, rId, completed, availableBikes;
  return regeneratorRuntime.async(function getBikes$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(BikeBooking.find());

        case 3:
          pendingBookings = _context.sent;
          today = new Date();
          isoString = today.toISOString().slice(0, 10);
          console.log(isoString);
          todaysBookings = pendingBookings.filter(function (booking) {
            return booking.tripDate.toISOString().slice(0, 10) === isoString;
          });
          console.log(todaysBookings); // Extract unique rider IDs from today's bookings

          riderIds = _toConsumableArray(new Set(todaysBookings.map(function (booking) {
            return booking.rider.toString();
          })));
          rId = riderIds;
          console.log(rId);
          _context.next = 14;
          return regeneratorRuntime.awrap(Trip.find({
            rider: rId,
            status: 'Completed'
          }));

        case 14:
          completed = _context.sent;
          console.log(completed.length); // Update the availability of the bikes

          if (!(completed.length < 1)) {
            _context.next = 20;
            break;
          }

          if (!(riderIds.length > 0)) {
            _context.next = 20;
            break;
          }

          _context.next = 20;
          return regeneratorRuntime.awrap(Bike.updateMany({
            rider: rId,
            available: false
          }));

        case 20:
          _context.next = 22;
          return regeneratorRuntime.awrap(Bike.find({
            available: true
          }));

        case 22:
          availableBikes = _context.sent;
          res.json(availableBikes); // Find and return available bikes

          _context.next = 30;
          break;

        case 26:
          _context.prev = 26;
          _context.t0 = _context["catch"](0);
          console.error('Error fetching bikes:', _context.t0);
          res.status(500).json({
            error: 'Internal Server Error'
          });

        case 30:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 26]]);
};

var getBikeById = function getBikeById(req, res) {
  var bikeId, bike;
  return regeneratorRuntime.async(function getBikeById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          bikeId = req.params.id;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Bike.findById(bikeId));

        case 4:
          bike = _context2.sent;

          if (bike) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            error: 'Bike not found'
          }));

        case 7:
          res.json(bike);
          _context2.next = 14;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.error('Error fetching bike by ID:', _context2.t0);
          res.status(500).json({
            error: 'Internal Server Error'
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

var addBike = function addBike(req, res) {
  var _req$body, rider, name, type, description, price, luggageOptions, riderinfo, riderIdPRoof, newBike;

  return regeneratorRuntime.async(function addBike$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log(req.file);
          console.log(req.body);
          _context3.prev = 2;
          _req$body = req.body, rider = _req$body.rider, name = _req$body.name, type = _req$body.type, description = _req$body.description, price = _req$body.price, luggageOptions = _req$body.luggageOptions;
          _context3.next = 6;
          return regeneratorRuntime.awrap(User.find({
            _id: rider
          }));

        case 6:
          riderinfo = _context3.sent;
          riderIdPRoof = riderinfo[0].photo2;
          console.log('Luggage options received:', luggageOptions);
          newBike = new Bike({
            rider: rider,
            name: name,
            type: type,
            description: description,
            price: price,
            riderIdPRoof: riderIdPRoof,
            image: req.file.filename,
            luggageOptions: luggageOptions
          });
          _context3.next = 12;
          return regeneratorRuntime.awrap(newBike.save());

        case 12:
          res.json({
            message: 'Bike added successfully'
          });
          _context3.next = 19;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](2);
          console.error('Error adding bike:', _context3.t0);
          res.status(500).json({
            error: 'Internal Server Error'
          });

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 15]]);
};

module.exports = {
  getBikes: getBikes,
  addBike: addBike,
  getBikeById: getBikeById
};