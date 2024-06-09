"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mongoose = require('mongoose');

var validator = require('validator');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

require('dotenv').config();

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, 'This username is already taken!'],
    lowercase: true
  },
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate: function validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  photo: {
    type: String // default: 'https://www.w3schools.com/howto/img_avatar.png'

  },
  photo2: {
    type: String // default: 'https://www.w3schools.com/howto/img_avatar.png'

  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate: function validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"');
      }
    }
  },
  passwordConfirm: {
    type: String,
    required: true,
    minlength: [7, 'Password should have atleast 7 characters.'],
    validate: {
      validator: function validator(val) {
        return toString(this.password) === toString(val);
      },
      message: 'Provided passwords do not match. Please try again'
    }
  },
  passwordChangedAt: {
    type: Date,
    "default": Date.now(),
    select: false
  },
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetValidity: {
    type: Date,
    select: false
  },
  isActive: {
    type: Boolean,
    "default": true
  },
  lastSeenAt: {
    type: Date,
    "default": 0
  },
  mobile: {
    type: String,
    validate: {
      validator: function validator(v) {// return /\d{3}-\d{3}-\d{4}/.test(v)
      },
      message: function message(props) {
        return "".concat(props.value, " is not a valid phone number!");
      }
    },
    required: [true, 'User phone number required']
  },
  invalidatedTokens: [String],
  role: {
    type: String,
    "enum": ['admin', 'rider', 'customer'],
    "default": 'admin'
  } // enrollments: [
  //   {
  //     type: mongoose.SchemaTypes.ObjectId,
  //     ref: 'Course'
  //   }
  // ],
  // isEmailRegistered: {
  //   type: Boolean,
  //   default: false
  // },
  // bikeDetails: {
  //   bikeModel: { type: String},
  //   bikeType: { type: String },
  // },
  // availabileBikes:{
  //   type:String,
  //   default:true,
  //   required:true
  // },
  // availability: {
  //   monday: { type: Boolean, default: false },
  //   tuesday: { type: Boolean, default: false },
  //   wednesday: { type: Boolean, default: false },
  //   thursday: { type: Boolean, default: false },
  //   friday: { type: Boolean, default: false },
  //   saturday: { type: Boolean, default: false },
  //   sunday: { type: Boolean, default: false },
  // },
  // rates: {
  //   hourlyRate: { type: Number  }
  // }

});
userSchema.index({
  name: 1,
  username: 1
});
userSchema.virtual('Assignment', {
  ref: 'Assignment',
  localField: '_id',
  foreignField: 'owner'
});
userSchema.virtual('followers', {
  ref: 'Follow',
  foreignField: 'follows',
  localField: '_id'
});
userSchema.virtual('followersCount', {
  ref: 'Follow',
  foreignField: 'follows',
  localField: '_id',
  count: true
});
userSchema.virtual('follows', {
  ref: 'Follow',
  foreignField: 'user',
  localField: '_id'
});
userSchema.virtual('followCount', {
  ref: 'Follow',
  foreignField: 'user',
  localField: '_id',
  count: true
});
userSchema.virtual('articles', {
  ref: 'Article',
  foreignField: 'createdBy',
  localField: '_id'
});
userSchema.virtual('view', {
  ref: 'View',
  foreignField: 'user',
  localField: '_id'
});
userSchema.virtual('articlesCount', {
  ref: 'Article',
  foreignField: 'createdBy',
  localField: '_id',
  count: true
});

userSchema.methods.toJSON = function () {
  var user = this.toObject();
  return _objectSpread({}, user, {
    password: undefined,
    __v: undefined,
    invalidatedTokens: undefined,
    passwordConfirm: undefined
  });
};

userSchema.methods.generateAuthToken = function _callee() {
  var user, token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = this;
          token = jwt.sign({
            _id: user._id.toString()
          }, process.env.SECRET_KEY1, {
            expiresIn: 86400
          });
          return _context.abrupt("return", token);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
};

userSchema.pre('save', function _callee2(next) {
  var user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          user = this;

          if (!user.isModified('password')) {
            _context2.next = 5;
            break;
          }

          _context2.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(user.password, 8));

        case 4:
          user.password = _context2.sent;

        case 5:
          next();

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
});
var User = mongoose.model('User', userSchema);
module.exports = User;