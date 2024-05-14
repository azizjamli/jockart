const express = require('express');
const router = express.Router();

// Import necessary models
const usercours = require('../models/userscours');
const User = require('../models/users'); // Import the User model
const Cours = require('../models/cours'); // Import the Cours model

// CREATE (POST)
const coursfinder = async (req, res) => {
  try {
    // Extract userID and selectedCategoryId from request query parameters
    const userID = req.query.userId;
    const selectedCategoryId = req.query.selectedCategoryId;

    if (!userID || !selectedCategoryId) {
      return res.status(400).json({ error: 'User ID or Selected Category ID missing in query parameters' });
    }

    // Query usercours table to get courses for the given user ID and category ID
    const userCourses = await usercours.findAll({
      attributes: [ 'createdAt', 'updatedAt', 'coursId'], // Specify the attributes to select from userCourses
      include: [
        {
          model: Cours, // Include the Cours model
          attributes: ['id', 'titre', 'description', 'prix', 'photo', 'categorieId'], // Specify the attributes to select from Cours
          where: { categorieId: selectedCategoryId },
          as: 'Cour', // Correct alias to match the association
        },
      ],
      where: { userId: userID },
    });

    res.status(200).json(userCourses); // Return the userCourses directly since they already contain the necessary data
  } catch (error) {
    console.error('Error fetching user courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  coursfinder,
};
