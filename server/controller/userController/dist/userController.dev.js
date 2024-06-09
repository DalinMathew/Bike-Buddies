"use strict";

var User = require('../../model/userModel');

var jwt = require('jsonwebtoken');

var axios = require('axios');

var bcrypt = require('bcrypt');

var bcryptjs = require('bcryptjs');

require('dotenv').config();

var multer = require('multer');

var path = require('path');

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(Date.now(), "-").concat(file.originalname));
  }
});
var upload = multer({
  storage: storage
});
var awsEmailResisterUrl = '';

var createUser = function createUser(req, res) {
  var userExists, saltRounds, hashedPassword, user;
  return regeneratorRuntime.async(function createUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 3:
          userExists = _context.sent;

          if (!userExists) {
            _context.next = 6;
            break;
          }

          throw new Error("User already exists");

        case 6:
          // hash the password
          saltRounds = 10;
          hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
          req.body.password = hashedPassword; // save the user

          user = new User(req.body);
          user.code = Date.now();
          _context.next = 13;
          return regeneratorRuntime.awrap(user.save());

        case 13:
          res.status(201).send({
            success: true,
            message: "User registered successfully!"
          });
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          res.send({
            success: false,
            message: _context.t0.message
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

var login = function login(req, res) {
  var user, token;
  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 3:
          user = _context2.sent;
          console.log(user);

          if (user) {
            _context2.next = 7;
            break;
          }

          throw new Error("User does not exist");

        case 7:
          if (!(req.body.password !== user.passwordConfirm)) {
            _context2.next = 9;
            break;
          }

          throw new Error('Unable to login 2');

        case 9:
          _context2.next = 11;
          return regeneratorRuntime.awrap(user.generateAuthToken());

        case 11:
          token = _context2.sent;
          console.log("token", token);
          res.send({
            success: true,
            data: token,
            message: "User logged in successfully",
            user: user
          });
          _context2.next = 20;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          res.status(400).send({
            success: false,
            message: _context2.t0.message
          });
          console.log(_context2.t0);

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

var logout = function logout(req, res) {
  var Id, token, user;
  return regeneratorRuntime.async(function logout$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          Id = req.body.id;
          console.log(Id);
          token = ''; // const authorization = req.get('authorization')
          // console.log(authorization)
          // if (authorization && authorization.startsWith('Bearer')) {
          //   token = authorization.substring(7)
          // }
          // const decoded = jwt.decode(token)

          _context3.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            _id: Id
          }));

        case 6:
          user = _context3.sent;
          console.log(user);

          if (user) {
            _context3.next = 12;
            break;
          }

          res.status(400).send('token is corrupted');
          _context3.next = 15;
          break;

        case 12:
          _context3.next = 14;
          return regeneratorRuntime.awrap(user.save());

        case 14:
          res.send('You Logged out');

        case 15:
          _context3.next = 20;
          break;

        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](0);
          res.status(500).send({
            error: _context3.t0.message || _context3.t0.toString()
          });

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 17]]);
};

var updateUser = function updateUser(req, res) {
  var _req$body, _id, name, email, age, mobile, username, updateFields, updatedUser;

  return regeneratorRuntime.async(function updateUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          // const id = req.user._id;
          // const usr = req.body;
          console.log(req.files.photo2);
          console.log(req.files.photo);
          console.log(req.body);
          _context4.prev = 3;
          _req$body = req.body, _id = _req$body._id, name = _req$body.name, email = _req$body.email, age = _req$body.age, mobile = _req$body.mobile, username = _req$body.username; // Prepare the update object with the provided fields

          updateFields = {
            name: name,
            email: email,
            mobile: mobile,
            username: username,
            age: age
          }; // Add the photo filenames to the update object if they are provided

          if (req.files.photo) {
            updateFields.photo = req.files.photo[0].filename;
          }

          if (req.files.photo2) {
            updateFields.photo2 = req.files.photo2[0].filename;
          } // Find the user by ID and update their details


          _context4.next = 10;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(_id, updateFields, {
            "new": true
          } // Return the updated document
          ));

        case 10:
          updatedUser = _context4.sent;

          if (updatedUser) {
            _context4.next = 13;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));

        case 13:
          res.status(200).json(updatedUser);
          _context4.next = 20;
          break;

        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](3);
          console.error('Error updating user:', _context4.t0);
          res.status(500).json({
            message: 'Server error'
          });

        case 20:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[3, 16]]);
};

var deleteUser = function deleteUser(req, res) {
  var userId;
  return regeneratorRuntime.async(function deleteUser$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          userId = req.params.userId; // Assuming the user ID is passed as a URL parameter

          console.log("userId", userId); // Find the user by ID and remove it from the database

          _context5.next = 5;
          return regeneratorRuntime.awrap(User.findByIdAndDelete(userId));

        case 5:
          res.status(200).send('User deleted successfully');
          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          res.status(500).send('Failed to delete user');

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var me = function me(req, res) {
  return regeneratorRuntime.async(function me$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          res.send(req.user);

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
};

var usersList = function usersList(req, res) {
  var users;
  return regeneratorRuntime.async(function usersList$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(User.find());

        case 3:
          users = _context7.sent;
          console.log("Users:", users);
          res.send(users);
          _context7.next = 12;
          break;

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          console.error("Error fetching users:", _context7.t0.message);
          res.status(500).send("Internal Server Error");

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

module.exports = {
  createUser: createUser,
  login: login,
  updateUser: updateUser,
  logout: logout,
  deleteUser: deleteUser,
  me: me,
  usersList: usersList
};