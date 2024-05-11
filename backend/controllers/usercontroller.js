const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { validationResult } = require('express-validator');
const { SECRET_KEY } = process.env;

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if the user exists in the database
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'User not found'
        
       });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(404).json({ error: 'Incorrect password' });
    }

 // Generate JWT access token
 const accessToken = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });

 // Generate JWT refresh token
 const refreshToken = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '7d' }); // Example: Refresh token expires in 7 days

 // Set HTTP-only cookies with tokens
 res.cookie('accessToken', accessToken, {
   httpOnly: true,
   maxAge: 3600000, // 1 hour in milliseconds
 });
 res.cookie('refreshToken', refreshToken, {
   httpOnly: true,
   maxAge: 604800000, // 7 days in milliseconds
 });

 // Send tokens in response
 res.status(200).json({ message: 'Signin successful', accessToken, refreshToken });
  } catch (error) {
    console.error('Signin error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = await User.create({ email, password });

    // Generate JWT token
    const token = jwt.sign({ userId: newUser.id }, SECRET_KEY, { expiresIn: '1h' });

    // Send token in response
    res.status(201).json({ message: 'User created', token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { signin, signup };
