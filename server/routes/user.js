const express = require('express')
const auth = require('../middleware/auth')
const upload = require('../middleware/multer')

// const multer = require('multer');
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


const router = new express.Router()
const {
  createUser,
  login,
  updateUser,
  logout,
  deleteUser,
  me,
  usersList
} = require('../controller/userController/userController')

const {
  RECOVER,
  RESET,
  ResetPassword
} = require('../controller/userController/passwordController')

router.get('/userlist',usersList)
router.post('/register', createUser)
router.post('/login', login)
router.post('/logout', logout)
router.post('/recover', RECOVER)
router.get('/reset/:token', RESET)
router.post('/reset/:token', ResetPassword)
router.get('/me', me)
router.post('/update', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'photo2', maxCount: 1 },
]),updateUser)
router.delete('/userlist/:userId', deleteUser);

module.exports = router
