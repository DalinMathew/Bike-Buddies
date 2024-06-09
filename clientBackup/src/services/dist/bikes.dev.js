"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var baseURL = 'http://localhost:9000/';

var getAllBikes = function getAllBikes() {
  var response;
  return regeneratorRuntime.async(function getAllBikes$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(baseURL, "bikes/bikeList")));

        case 3:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          // Handle error
          console.error('Failed to fetch user list:', _context.t0.message);
          throw _context.t0;

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var getBikeById = function getBikeById(bikeId) {
  var response;
  return regeneratorRuntime.async(function getBikeById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(baseURL, "bikes/").concat(bikeId)));

        case 3:
          response = _context2.sent;
          return _context2.abrupt("return", response.data);

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error('Failed to fetch bike by ID:', _context2.t0.message);
          throw _context2.t0;

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var bookBike = function bookBike(bookData) {
  var response;
  return regeneratorRuntime.async(function bookBike$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(baseURL, "customer/bookings"), bookData));

        case 3:
          response = _context3.sent;
          return _context3.abrupt("return", response.data);

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error('Failed to fetch bike by ID:', _context3.t0.message);
          throw _context3.t0;

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var createFeedback = function createFeedback(feedbackData) {
  var response;
  return regeneratorRuntime.async(function createFeedback$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(baseURL, "feedbacks"), feedbackData));

        case 3:
          response = _context4.sent;
          return _context4.abrupt("return", response.data);

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.error('Failed to fetch bike by ID:', _context4.t0.message);
          throw _context4.t0;

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var addBike = function addBike(data) {
  var response;
  return regeneratorRuntime.async(function addBike$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(baseURL), data));

        case 2:
          response = _context5.sent;
          return _context5.abrupt("return", response.data);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var bikesService = {
  getAllBikes: getAllBikes,
  addBike: addBike,
  getBikeById: getBikeById,
  bookBike: bookBike,
  createFeedback: createFeedback
};
var _default = bikesService;
exports["default"] = _default;