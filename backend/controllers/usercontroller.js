const User = require('../models/users'); // Assuming your User model is in a file named 'models.js'
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../dbConfig');

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Using 10 salt rounds

    // Create the new user with the hashed password
    const newUser = await User.create({
      email: email,
      password: hashedPassword,
      // Add other user data as needed
    });

    // Generate a JWT token for the new user
    const token = jwt.sign({ userId: newUser.id }, 'your_secret_key', { expiresIn: '1h' });

    res.status(201).json({ message: 'User created', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signin, signup };
