const Chapitre = require('../models/Chapitre');
const { QueryTypes } = require('sequelize');
const sequelize = require('../dbConfig');

const getChapitresByCoursId = async (req, res) => {
  const coursId = parseInt(req.params.coursId); // Extract and parse the course ID from the request parameters

  // Check if coursId is a valid number
  if (isNaN(coursId) || coursId <= 0) {
    return res.status(400).json({ message: 'Invalid course ID' });
  }

  try {
    // Construct the SQL SELECT statement with a named placeholder
    const selectQuery = `
      SELECT * FROM chapitre WHERE cours_id = :coursId
    `;

    // Execute the SQL query with named placeholder and replacement map
    const chapitres = await sequelize.query(selectQuery, {
      replacements: { coursId }, // Pass the parsed coursId as a named placeholder
      type: QueryTypes.SELECT,
    });

    console.log('coursId:', coursId); // Log the coursId here

    if (chapitres.length === 0) {
      return res.status(404).json({ message: 'No chapters found for this course ID' });
    }

    res.json(chapitres);
  } catch (error) {
    console.error('Error fetching chapitres:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getChapitresByCoursId
};
