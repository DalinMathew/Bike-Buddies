"use strict";

var express = require('express');

var router = express.Router();

var User = require('../../model/userModel');

var Feedback = require('../../model/Feedback'); // Create feedback


var createFeedback = function createFeedback(req, res) {
  var _req$body, riderId, customerId, rating, comment, role, destination, tripdate, feedback;

  return regeneratorRuntime.async(function createFeedback$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, riderId = _req$body.riderId, customerId = _req$body.customerId, rating = _req$body.rating, comment = _req$body.comment, role = _req$body.role, destination = _req$body.destination, tripdate = _req$body.tripdate;
          feedback = new Feedback({
            rider: riderId,
            customer: customerId,
            rating: rating,
            comment: comment,
            role: role,
            destination: destination,
            tripdate: tripdate
          });
          _context.next = 5;
          return regeneratorRuntime.awrap(feedback.save());

        case 5:
          res.status(201).json({
            success: true,
            message: 'Feedback submitted successfully'
          });
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            success: false,
            message: 'Server error'
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // Get feedback for a rider


var getFeedbackForRider = function getFeedbackForRider(req, res) {
  var riderId, feedback, rider, custId, customer;
  return regeneratorRuntime.async(function getFeedbackForRider$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          riderId = req.params.riderId;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Feedback.find({
            rider: riderId
          }));

        case 4:
          feedback = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap(User.find({
            _id: riderId
          }));

        case 7:
          rider = _context2.sent;
          custId = feedback.map(function (e) {
            return e.customer;
          });
          _context2.next = 11;
          return regeneratorRuntime.awrap(User.find({
            _id: {
              $in: custId
            }
          }));

        case 11:
          customer = _context2.sent;
          // console.log("Customer",customer);
          res.json({
            feedback: feedback,
            customer: customer,
            rider: rider
          });
          _context2.next = 19;
          break;

        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            success: false,
            message: 'Server error'
          });

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

var getAllFeedback = function getAllFeedback(req, res) {
  var Allfeedback, allRiderId, AllCustomerId, AllCustomer, allRider;
  return regeneratorRuntime.async(function getAllFeedback$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Feedback.find());

        case 3:
          Allfeedback = _context3.sent;
          // console.log("Allfedback",Allfeedback);
          allRiderId = Allfeedback.map(function (e) {
            return e.rider;
          });
          AllCustomerId = Allfeedback.map(function (e) {
            return e.customer;
          });
          _context3.next = 8;
          return regeneratorRuntime.awrap(User.find({
            _id: {
              $in: AllCustomerId
            }
          }));

        case 8:
          AllCustomer = _context3.sent;
          _context3.next = 11;
          return regeneratorRuntime.awrap(User.find({
            _id: {
              $in: allRiderId
            }
          }));

        case 11:
          allRider = _context3.sent;
          console.log("AllRider", AllCustomer);
          res.json({
            Allfeedback: Allfeedback,
            AllCustomer: AllCustomer,
            allRider: allRider
          });
          _context3.next = 20;
          break;

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.status(500).json({
            success: false,
            message: 'Server error'
          });

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 16]]);
}; // Respond to feedback


var respondToFeedback = function respondToFeedback(req, res) {
  var id, response, feedback;
  return regeneratorRuntime.async(function respondToFeedback$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          response = req.body.response;
          _context4.next = 5;
          return regeneratorRuntime.awrap(Feedback.findByIdAndUpdate(id, {
            responded: true,
            response: response
          }, {
            "new": true
          }));

        case 5:
          feedback = _context4.sent;
          res.json({
            success: true,
            message: 'Feedback response updated successfully',
            feedback: feedback
          });
          _context4.next = 13;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          res.status(500).json({
            success: false,
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
  createFeedback: createFeedback,
  getFeedbackForRider: getFeedbackForRider,
  respondToFeedback: respondToFeedback,
  getAllFeedback: getAllFeedback
};