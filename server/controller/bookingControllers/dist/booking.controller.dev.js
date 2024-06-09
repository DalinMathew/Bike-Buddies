"use strict";

var express = require('express');

var router = express.Router();

var Booking = require('../../model/bookingRiders'); // Route to get all incoming booking requests


router.get('/bookings', function _callee(req, res) {
  var bookings;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Booking.find({
            status: 'pending'
          }).populate('rider customer'));

        case 3:
          bookings = _context.sent;
          res.json(bookings);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: 'Server error'
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Route to accept a booking request

router.put('/bookings/:id/accept', function _callee2(req, res) {
  var booking;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Booking.findByIdAndUpdate(req.params.id, {
            status: 'accepted'
          }, {
            "new": true
          }));

        case 3:
          booking = _context2.sent;

          if (booking) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: 'Booking not found'
          }));

        case 6:
          res.json(booking);
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: 'Server error'
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // Route to reject a booking request

router.put('/bookings/:id/reject', function _callee3(req, res) {
  var booking;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Booking.findByIdAndUpdate(req.params.id, {
            status: 'rejected'
          }, {
            "new": true
          }));

        case 3:
          booking = _context3.sent;

          if (booking) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: 'Booking not found'
          }));

        case 6:
          res.json(booking);
          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: 'Server error'
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // Route to communicate with customer regarding trip details

router.post('/bookings/:id/communicate', function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          try {
            // Implement communication logic with customer here
            res.json({
              message: 'Communication sent successfully'
            });
          } catch (error) {
            res.status(500).json({
              message: 'Server error'
            });
          }

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
});
module.exports = router;