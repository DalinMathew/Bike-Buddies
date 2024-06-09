"use strict";

var express = require('express');

var BikeBooking = require('../../model/bookingCustomer');

var Booking = require('../../model/bookingRiders');

var User = require('../../model/userModel');

var Bike = require('../../model/bike'); // Route to get all incoming booking requests


var getAllBookings = function getAllBookings(req, res) {
  var allBookings, riderIds, customerIds, bikeIds, bikes, customers, riders, combinedData;
  return regeneratorRuntime.async(function getAllBookings$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(BikeBooking.find());

        case 3:
          allBookings = _context.sent;
          riderIds = allBookings.map(function (e) {
            return e.rider;
          });
          console.log(riderIds);
          customerIds = allBookings.map(function (e) {
            return e.customer;
          });
          bikeIds = allBookings.map(function (e) {
            return e.bike;
          });
          _context.next = 10;
          return regeneratorRuntime.awrap(Bike.find({
            _id: {
              $in: bikeIds
            }
          }));

        case 10:
          bikes = _context.sent;
          _context.next = 13;
          return regeneratorRuntime.awrap(User.find({
            _id: {
              $in: customerIds
            }
          }));

        case 13:
          customers = _context.sent;
          _context.next = 16;
          return regeneratorRuntime.awrap(User.find({
            _id: {
              $in: riderIds
            }
          }));

        case 16:
          riders = _context.sent;
          combinedData = allBookings.map(function (booking) {
            var bike = bikes.find(function (bike) {
              return bike._id.equals(booking.bike);
            });
            var customer = customers.find(function (customer) {
              return customer._id.equals(booking.customer);
            });
            var rider = riders.find(function (rider) {
              return rider._id.equals(booking.rider);
            });
            return {
              bookingId: booking._id,
              status: booking.status,
              riderId: booking.rider,
              customer: {
                id: customer._id,
                name: customer.name,
                email: customer.email,
                mobile: customer.mobile,
                age: customer.age
              },
              rider: {
                id: rider._id,
                name: rider.name,
                email: rider.email,
                mobile: rider.mobile,
                age: rider.age
              },
              bike: {
                id: bike._id,
                name: bike.name,
                type: bike.type,
                price: bike.price,
                image: bike.image,
                riderIdPRoof: bike.riderIdPRoof
              }
            };
          });
          console.log(combinedData);

          if (allBookings) {
            res.status(200).json(combinedData);
          } else {
            res.status(404).json({
              message: 'No bookings found'
            });
          }

          _context.next = 25;
          break;

        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: 'Server error'
          });

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 22]]);
};

var bookings = function bookings(req, res) {
  var _bookings, riderId, customerId, bikeId, bikes, customers;

  return regeneratorRuntime.async(function bookings$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log("getting");
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(BikeBooking.find({
            status: 'pending'
          }));

        case 4:
          _bookings = _context2.sent;
          riderId = _bookings.map(function (e) {
            return e.rider;
          });
          console.log(riderId);
          customerId = _bookings.map(function (e) {
            return e.customer;
          });
          bikeId = _bookings.map(function (e) {
            return e.bike;
          });
          _context2.next = 11;
          return regeneratorRuntime.awrap(Bike.find({
            _id: {
              $in: bikeId
            }
          }));

        case 11:
          bikes = _context2.sent;
          _context2.next = 14;
          return regeneratorRuntime.awrap(User.find({
            _id: {
              $in: customerId
            }
          }));

        case 14:
          customers = _context2.sent;
          // console.log(bikes) 
          res.json({
            bookings: _bookings,
            customers: customers,
            bikes: bikes
          });
          _context2.next = 21;
          break;

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](1);
          res.status(500).json({
            message: 'Server error'
          });

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 18]]);
}; // Route to accept a booking request


var acceptBookingById = function acceptBookingById(req, res) {
  var riderId, booking, ridersBike, today, isoString;
  return regeneratorRuntime.async(function acceptBookingById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          // req.params.id  
          riderId = req.body.riderId;
          _context3.next = 4;
          return regeneratorRuntime.awrap(BikeBooking.findByIdAndUpdate(req.params.id, {
            status: 'accepted'
          }, {
            "new": true
          }));

        case 4:
          booking = _context3.sent;
          _context3.next = 7;
          return regeneratorRuntime.awrap(Booking.create());

        case 7:
          _context3.next = 9;
          return regeneratorRuntime.awrap(Bike.find({
            rider: riderId
          }));

        case 9:
          ridersBike = _context3.sent;
          today = new Date();
          isoString = today.toISOString().slice(0, 10);
          console.log(isoString); // console.log(ridersBike)
          // if(isoString == booking.tripDate.toISOString().slice(0, 10)){
          // await Bike.updateMany({ rider: { $in: riderId },available:false });
          // }
          // if (!booking) {
          //   return res.status(404).json({ message: 'Booking not found' });
          // }

          res.json(booking);
          _context3.next = 19;
          break;

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: 'Server error'
          });

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 16]]);
}; // Route to reject a booking request


var rejectBookingById = function rejectBookingById(req, res) {
  var booking;
  return regeneratorRuntime.async(function rejectBookingById$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(BikeBooking.findByIdAndUpdate(req.params.id, {
            status: 'rejected'
          }, {
            "new": true
          }));

        case 3:
          booking = _context4.sent;

          if (booking) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: 'Booking not found'
          }));

        case 6:
          // await Bike.updateMany({ rider: { $in: riderId } }, { available: false });
          res.json(booking);
          _context4.next = 12;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            message: 'Server error'
          });

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; // Route to communicate with customer regarding trip details


var CustCommuniation = function CustCommuniation(req, res) {
  return regeneratorRuntime.async(function CustCommuniation$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
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
          return _context5.stop();
      }
    }
  });
};

module.exports = {
  getAllBookings: getAllBookings,
  bookings: bookings,
  acceptBookingById: acceptBookingById,
  rejectBookingById: rejectBookingById,
  CustCommuniation: CustCommuniation
};