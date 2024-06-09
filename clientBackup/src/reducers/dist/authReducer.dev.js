"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.logout = exports.login = exports.getBikeById = exports.register = exports.editProfile = void 0;

var _users = _interopRequireDefault(require("../services/users"));

var _auth = require("../actions/auth");

var _bike = require("../actions/bike");

var _antd = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var adapterFunc = function adapterFunc(user) {
  console.log(user);

  if (user.user == undefined) {
    return _objectSpread({}, user, {
      token: user.token
    });
  }

  return _objectSpread({}, user.user, {
    token: user.token
  });
};

var user = window.localStorage.getItem('elearning-user');
console.log(user);
var intialState = user ? {
  user: adapterFunc(JSON.parse(user)),
  isAuth: true
} : {
  user: null,
  isAuth: false
};
console.log(intialState);

var authReducer = function authReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : intialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _auth.SET_USER:
      return {
        user: adapterFunc(action.user),
        isAuth: true
      };

    case _auth.UPDATE_USER:
      return {
        user: adapterFunc(action.user),
        isAuth: true
      };

    case _auth.CLEAR_USER:
      return {
        user: null,
        isAuth: false
      };

    default:
      return state;
  }
};

var editProfile = function editProfile(user) {
  return function _callee(dispatch) {
    var response;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(_users["default"].update(user));

          case 3:
            response = _context.sent;
            console.log(response);

            if (response) {
              window.localStorage.setItem('elearning-user', JSON.stringify(response));
              dispatch({
                type: _auth.UPDATE_USER,
                user: response
              });

              _antd.notification.success({
                message: 'Saved Successfully'
              });
            } else {
              _antd.notification.error({
                message: 'Cant Save'
              });
            }

            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);

            _antd.notification.error({
              message: 'Cant Save'
            });

            console.log(_context.t0);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 8]]);
  };
};

exports.editProfile = editProfile;

var register = function register(credentials) {
  return function _callee2() {
    var response;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(_users["default"].registering(credentials));

          case 3:
            response = _context2.sent;

            if (response) {
              _context2.next = 6;
              break;
            }

            throw new Error('invalid error with response');

          case 6:
            _context2.next = 12;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);

            _antd.message.error('invalid credentials');

            console.log(_context2.t0);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 8]]);
  };
};

exports.register = register;

var getBikeById = function getBikeById(BikeId) {
  return function _callee3(dispatch) {
    var response;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap(_users["default"].getBikeById(BikeId));

          case 3:
            response = _context3.sent;
            // Assuming getBikeById is a function in your API service
            dispatch({
              type: _bike.BIKE_FETCH_SUCCESS,
              payload: response
            });
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            dispatch({
              type: _bike.BIKE_FETCH_FAILURE,
              payload: _context3.t0.message
            });

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };
};
/* actions for authentication bellow */


exports.getBikeById = getBikeById;

var login = function login(credentials) {
  return function _callee4(dispatch) {
    var response;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return regeneratorRuntime.awrap(_users["default"].login(credentials));

          case 3:
            response = _context4.sent;
            window.localStorage.setItem('elearning-user', JSON.stringify(response)); //   subscribeUser();

            dispatch({
              type: _auth.SET_USER,
              user: response
            });
            console.log('subscribed');
            _context4.next = 13;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0); // the backend should send the error message to show
            // message.error(error.response.data.message)

            _antd.message.error('invalid credentials');

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 9]]);
  };
};

exports.login = login;

var logout = function logout(id) {
  // console.log(id)
  return function _callee5(dispatch) {
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            console.log('logout');
            _context5.next = 4;
            return regeneratorRuntime.awrap(_users["default"].logout(id));

          case 4:
            dispatch({
              type: _auth.CLEAR_USER
            });
            window.localStorage.removeItem('elearning-user');
            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 8]]);
  };
};

exports.logout = logout;
var _default = authReducer;
exports["default"] = _default;