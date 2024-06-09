const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./media");
    },
    filename: (req, file, cb) => {
      // console.log(req.body)
        // console.log("fdjdh",file.originalname)
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
  const upload = multer({ storage: storage });
  module.exports = upload;