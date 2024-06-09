const User = require('../../model/userModel')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const bcrypt = require('bcrypt');
const bcryptjs = require('bcryptjs')
require('dotenv').config()


const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });



const awsEmailResisterUrl = '';

const createUser = async (req, res) => {
    try{
        // check if the user already exists
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
          throw new Error("User already exists");
        }
    
     
       // hash the password
       const saltRounds = 10;
       const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
       req.body.password = hashedPassword;
    
        // save the user
        const user = new User(req.body);
        user.code = Date.now()
        await user.save();

        res.status(201).send({
            success: true,
            message: "User registered successfully!",
          });

      } catch (error) {
        res.send({
          success: false,
          message: error.message,
        });
      }
};



const login = async (req, res) => {
  try {
    // console.log(req.body)
    // console.log(process.env.SECRET_KEY1)

     // check if the user exists
     const user = await User.findOne({ email: req.body.email });
     console.log(user)
     if (!user) {
       throw new Error("User does not exist");
     }
 
     if (req.body.password !== user.passwordConfirm) {
        throw new Error('Unable to login 2')
      }

    const token = await user.generateAuthToken();
    console.log("token",token)
    res.send({
      success: true,
      data: token,
      message: "User logged in successfully",
      user: user
    });
    
  } catch (e) {
    res.status(400).send({
        success: false,
        message: e.message,
      })
    console.log(e)
  }
}

const logout = async (req, res) => {
  try {
    let Id = req.body.id
    console.log(Id)
    let token = ''
    // const authorization = req.get('authorization')
    // console.log(authorization)
    // if (authorization && authorization.startsWith('Bearer')) {
    //   token = authorization.substring(7)
    // }
    // const decoded = jwt.decode(token)
    const user = await User.findOne({ _id: Id })
    console.log(user)

    if (!user){ res.status(400).send('token is corrupted')}

    // const alreadyInvalidated = await User.find({ invalidatedTokens: token })

    // if (alreadyInvalidated.length === 0) user.invalidatedTokens.push(token)

    // user.invalidatedTokens = user.invalidatedTokens.filter((token) => {
    //   const { exp } = jwt.decode(token)
    //   if (Date.now() >= exp * 1000) return false
    //   else return true
    // })
else{
    await user.save()
    res.send('You Logged out')
}
  } catch (e) {
    res.status(500).send({ error: e.message || e.toString() })
  }
}

const updateUser = async (req, res) => {
    // const id = req.user._id;
    // const usr = req.body;
    console.log(req.files.photo2)
    console.log(req.files.photo)

    console.log(req.body)
    try {
      const { _id, name, email, age, mobile, username } = req.body;
    
      // Prepare the update object with the provided fields
      const updateFields = { name, email, mobile, username, age };
    
      // Add the photo filenames to the update object if they are provided
      if (req.files.photo) {
        updateFields.photo = req.files.photo[0].filename;
      }
      if (req.files.photo2) {
        updateFields.photo2 = req.files.photo2[0].filename;
      }
    
      // Find the user by ID and update their details
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        updateFields,
        { new: true } // Return the updated document
      );
    
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
    
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Server error' });
    }
    
 
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming the user ID is passed as a URL parameter
    console.log("userId",userId)
    // Find the user by ID and remove it from the database
    await User.findByIdAndDelete(userId);
    res.status(200).send('User deleted successfully');
  } catch (e) {
    res.status(500).send('Failed to delete user');
  }
};


const me = async (req, res) => {
  res.send(req.user)
}

const usersList = async (req, res) => {
  try {
    const users = await User.find();
    console.log("Users:", users);
    res.send(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createUser,
  login,
  updateUser,
  logout,
  deleteUser,
  me,
  usersList
}