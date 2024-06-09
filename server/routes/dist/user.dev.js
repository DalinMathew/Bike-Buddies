"use strict";

var express = require('express');

var auth = require('../middleware/auth');

var upload = require('../middleware/multer'); // const multer = require('multer');
// // const path = require('path');
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// const upload = multer({ storage });


var router = new express.Router();

var _require = require('../controller/userController/userController'),
    createUser = _require.createUser,
    login = _require.login,
    updateUser = _require.updateUser,
    logout = _require.logout,
    deleteUser = _require.deleteUser,
    me = _require.me,
    usersList = _require.usersList;

var _require2 = require('../controller/userController/passwordController'),
    RECOVER = _require2.RECOVER,
    RESET = _require2.RESET,
    ResetPassword = _require2.ResetPassword;

router.get('/userlist', usersList);
router.post('/register', createUser);
router.post('/login', login);
router.post('/logout', logout);
router.post('/recover', RECOVER);
router.get('/reset/:token', RESET);
router.post('/reset/:token', ResetPassword);
router.get('/me', me);
router.post('/update', upload.fields([{
  name: 'photo',
  maxCount: 1
}, {
  name: 'photo2',
  maxCount: 1
}]), updateUser);
router["delete"]('/userlist/:userId', deleteUser);
module.exports = router;