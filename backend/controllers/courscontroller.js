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

// Function to delete a course by ID
const deleteCours = async (req, res) => {
  const selectedCoursId = parseInt(req.params.id);

  if (isNaN(selectedCoursId) || selectedCoursId <= 0) {
    return res.status(400).json({ message: 'Invalid course ID' });
  }

  try {
    const deleteQuery = `
      DELETE FROM cours WHERE id = :selectedCoursId
    `;

    const deletedRows = await sequelize.query(deleteQuery, {
      replacements: { selectedCoursId },
      type: QueryTypes.DELETE,
    });

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).send('Server Error');
  }
};

// Function to update a course by ID
const updateCours = async (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  const { titre, description, prix, photo } = req.body;

  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ message: 'Invalid course ID' });
  }

  try {
    let updateQuery = `
      UPDATE cours
      SET titre = :titre, description = :description, prix = :prix
      WHERE id = :id
    `;
    const replacements = { titre, description, prix, id };

    // Check if photo is included in the request body
    if (photo) {
      updateQuery = `
        UPDATE cours
        SET titre = :titre, description = :description, prix = :prix, photo = :photo
        WHERE id = :id
      `;
      replacements.photo = photo;
    }

    const [result] = await sequelize.query(updateQuery, {
      replacements,
      type: QueryTypes.UPDATE,
    });

    /*if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }*/

    res.status(200).json({ message: 'Course updated successfully' });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).send('Server Error');
  }
};



module.exports = {
  getCoursByCategorieId,
  createCours,
  deleteCours,
  updateCours,
};
