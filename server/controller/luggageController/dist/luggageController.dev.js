"use strict";

var express = require('express');

var router = express.Router();

var LuggageOption = require('../../model/luggage'); // Create a new luggage option


var createLuggageOption = function createLuggageOption(req, res) {
  var _req$body, name, description, price, luggageOption;

  return regeneratorRuntime.async(function createLuggageOption$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, description = _req$body.description, price = _req$body.price, luggageOption = _req$body.luggageOption; // const luggageOption = new LuggageOption({ name, description, price });

          _context.next = 4;
          return regeneratorRuntime.awrap(luggageOption.save());

        case 4:
          res.status(201).json(luggageOption);
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Server error'
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Get all luggage options


var getAllLuggageOptions = function getAllLuggageOptions(req, res) {
  var luggageOptions;
  return regeneratorRuntime.async(function getAllLuggageOptions$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(LuggageOption.find());

        case 3:
          luggageOptions = _context2.sent;
          res.json(luggageOptions);
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            message: 'Server error'
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

module.exports = {
  createLuggageOption: createLuggageOption,
  getAllLuggageOptions: getAllLuggageOptions
};