const Cours = require('../models/Cours');
const { QueryTypes } = require('sequelize');
const sequelize = require('../dbConfig');

// Helper function to encode photo to Base64
const encodePhotoToBase64 = (photo) => {
  if (!photo) return null;
  const base64Image = Buffer.from(photo, 'binary').toString('base64');
  return base64Image;
};

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

    // Encode photo to Base64 before sending response
    const coursesWithBase64Photo = cours.map((course) => ({
      ...course,
      photo: encodePhotoToBase64(course.photo),
    }));

    res.json(coursesWithBase64Photo || []);
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
      INSERT INTO cours (titre, description, prix, categorieId, photo)
      VALUES (:titre, :description, :prix, :categorieId, :photo)
    `;

    // Encode photo to Base64 before insertion if it exists
    const base64Photo = encodePhotoToBase64(req.body.photo);
    const replacements = { titre, description, prix, categorieId, photo: base64Photo };

    await sequelize.query(insertQuery, {
      replacements,
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

    await sequelize.query(deleteQuery, {
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
      // Encode photo to Base64 before updating if it exists
      const base64Photo = encodePhotoToBase64(photo);
      updateQuery = `
        UPDATE cours
        SET titre = :titre, description = :description, prix = :prix, photo = :photo
        WHERE id = :id
      `;
      replacements.photo = base64Photo;
    }

    await sequelize.query(updateQuery, {
      replacements,
      type: QueryTypes.UPDATE,
    });

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
