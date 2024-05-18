const User = require('../models/users');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt'); // Import bcrypt library
const fs = require('fs');
const path = require('path');

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
      return res.status(401).json({ error: 'User not found' });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(404).json({ error: 'Incorrect password' });
    }

    // Send tokens in response along with user role and ID
    res.status(200).json({ message: 'Signin successful', role: user.role, id: user.id });
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

    // Create a new user
    const newUser = await User.create({ email, password });

    // Send response with the generated user ID
    res.status(201).json({ message: 'User created', userId: newUser.id });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getInfo = async (req, res) => {
  try {
    const { userId } = req.query; // Get userId from query parameters

    // Fetch user details using the userId
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Encode the photo to Base64 if it exists
    let photoBase64 = null;
    if (user.photo) {
      photoBase64 = Buffer.from(user.photo, 'binary').toString('base64');
    }

    // Send user details including Base64 encoded photo in the response
    res.status(200).json({ user: { ...user.toJSON(), photo: photoBase64 } });
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const uploadPhoto = async (req, res) => {
  const { userId } = req.params; // Assuming you pass the userId in the URL params
  const { photo } = req.files; // Assuming req.files contains the uploaded file data

  try {
    // Check if the user exists in the database
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Ensure the uploaded file is an image (optional)
    if (!photo || !photo.mimetype.startsWith('image')) {
      return res.status(400).json({ error: 'Please upload an image file' });
    }

    // Read the uploaded file and convert it to a Base64 string
    const imageBuffer = fs.readFileSync(photo.path);
    const imageBase64 = imageBuffer.toString('base64');

    // Update the photo column for the user with the Base64 encoded image
    await user.update({ photo: imageBase64 });

    // Delete the temporary uploaded file (optional, depending on your setup)
    fs.unlinkSync(photo.path);

    // Send success response
    res.status(200).json({ message: 'Photo uploaded successfully' });
  } catch (error) {
    console.error('Error uploading photo:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  signin,
  signup,
  getInfo,
  uploadPhoto,
};
