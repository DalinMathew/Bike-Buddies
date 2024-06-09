"use strict";

var multer = require('multer');

var path = require('path');

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "./media");
  },
  filename: function filename(req, file, cb) {
    // console.log(req.body)
    // console.log("fdjdh",file.originalname)
    cb(null, "".concat(Date.now(), "-").concat(file.originalname));
  }
});
var upload = multer({
  storage: storage
});
module.exports = upload;