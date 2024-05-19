const Cours = require('../models/Cours');
const { QueryTypes } = require('sequelize');
const sequelize = require('../dbConfig');

const getCoursByCategorieId = async (req, res) => {
  const categorieId = parseInt(req.params.categorieId); // Extract and parse the category ID from the request parameters

  // Check if categorieId is a valid number
  if (isNaN(categorieId) || categorieId <= 0) {
    return res.status(400).json({ message: 'Invalid category ID' });
  }

  try {
    // Construct the SQL SELECT statement with a named placeholder
    const selectQuery = `
      SELECT * FROM cours WHERE categorieId = :categorieId
    `;

    // Execute the SQL query with named placeholder and replacement map
    const cours = await sequelize.query(selectQuery, {
      replacements: { categorieId }, // Pass the parsed categorieId as a named placeholder
      type: QueryTypes.SELECT,
    });

    console.log('categorieId:', categorieId); // Log the categorieId here

    // Send an empty array if no courses are found
    res.json(cours || []);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getCoursByCategorieId
};
