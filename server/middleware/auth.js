const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
require('dotenv').config();

const auth = async (req, res, next) => {
  try {
    const authorization = req.get('authorization');
    if (authorization && authorization.startsWith('Bearer')) {
      token = authorization.substring(7);
    } else {
      return res.status(401).send({ error: 'Please provide a valid token.' });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error('User not found.');
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Authentication failed.' });
  }
};

module.exports = auth;
