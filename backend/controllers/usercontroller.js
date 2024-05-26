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
  const { email, password, role = 'etudiant' } = req.body; // Destructure role with a default value

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

    // Create a new user with the provided role
    const newUser = await User.create({ email, password, role });

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

    // Include the file path for the photo in the response
    const photoPath = user.photo ? `${req.protocol}://${req.get('host')}/uploads/user/${user.photo}` : null;

    // Send user details including photo path in the response
    res.status(200).json({ user: { ...user.toJSON(), photo: photoPath } });
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const uploadPhoto = async (req, res) => {
  const { userId } = req.params;

  try {
    // Check if the user exists in the database
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get the uploaded file information from multer
    const photo = req.file ? req.file.filename : null;

    if (!photo) {
      return res.status(400).json({ error: 'No photo uploaded' });
    }

    // Update the user's photo
    await user.update({ photo });

    // Send success response
    res.status(200).json({ message: 'Photo uploaded successfully', photo });
  } catch (error) {
    console.error('Error uploading photo:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { email, nom, prenom, numtel } = req.body;

  try {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if the user exists in the database
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get the uploaded file information from multer
    const photo = req.file ? req.file.filename : user.photo;

    // Update the user's details without modifying the password
    await user.update({
      email: email || user.email,
      nom: nom || user.nom,
      prenom: prenom || user.prenom,
      numtel: numtel || user.numtel,
      photo
    });

    // Send success response
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  signin,
  signup,
  getInfo,
  uploadPhoto,
  updateUser,
};
