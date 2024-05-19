const Cours = require('../models/Cours');
const { QueryTypes } = require('sequelize');
const sequelize = require('../dbConfig');

// Function to fetch courses by category ID
const getCoursByCategorieId = async (req, res) => {
  const categorieId = parseInt(req.params.categorieId);

  if (isNaN(categorieId) || categorieId <= 0) {
    return res.status(400).json({ message: 'Invalid category ID' });
  }

  try {
    const selectQuery = `
      SELECT * FROM cours WHERE categorieId = :categorieId
    `;

    const cours = await sequelize.query(selectQuery, {
      replacements: { categorieId },
      type: QueryTypes.SELECT,
    });

    console.log('categorieId:', categorieId);

    res.json(cours || []);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).send('Server Error');
  }
};

// Function to create a new course
const createCours = async (req, res) => {
  const { titre, description, prix } = req.body;
  const categorieId = parseInt(req.params.categorieId);

  if (isNaN(categorieId) || categorieId <= 0) {
    return res.status(400).json({ message: 'Invalid category ID' });
  }

  try {
    const insertQuery = `
      INSERT INTO cours (titre, description, prix, categorieId)
      VALUES (:titre, :description, :prix, :categorieId)
    `;

    await sequelize.query(insertQuery, {
      replacements: { titre, description, prix, categorieId },
      type: QueryTypes.INSERT,
    });

    res.status(201).json({ message: 'Course created successfully' });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getCoursByCategorieId,
  createCours,
};
