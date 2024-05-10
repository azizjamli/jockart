const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
    console.log('User found:', user);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Validate the password
    console.log('Entered password:', password);
    console.log('Stored hashed password:', user.password);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password validation result:', isPasswordValid);

    if (!isPasswordValid) {
      console.error('Password validation failed. Entered password:', password);
      throw new Error('Incorrect password');
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    console.log('Generated JWT token:', token); // Log the generated token
    res.status(200).json({ message: 'Signin successful', token }); // Send token in response

  } catch (error) {
    console.error('Signin error:', error.message);
    res.status(401).json({ error: 'Incorrect password' });
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

    const newUser = await User.create({ email, password});

    const token = jwt.sign({ userId: newUser.id }, SECRET_KEY, );

    res.status(201).json({ message: 'User created', token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { signin, signup };
