const Cours = require('../models/Cours');
const { QueryTypes } = require('sequelize');
const sequelize = require('../dbConfig');
const multer = require('multer');

const path = require('path'); // Import path for handling file paths

// Helper function to encode photo to Base64
/*const encodePhotoToBase64 = (photo) => {
  if (!photo) return null;
  const base64Image = Buffer.from(photo, 'binary').toString('base64');
  return base64Image;
};*/

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

    // Include the file path for the photo in the response
    const coursesWithPhotoPath = cours.map((course) => ({
      ...course,
      photo: course.photo ? `${req.protocol}://${req.get('host')}/uploads/cours/${course.photo}` : null,
    }));

    res.json(coursesWithPhotoPath || []);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).send('Server Error');
  }
};

// Function to create a new course
const createCours = async (req, res) => {
  const { titre, description, prix } = req.body;
  const categorieId = parseInt(req.params.categorieId);
  const userId = 1; // Assuming user ID 1 is hardcoded for simplicity

  if (isNaN(categorieId) || categorieId <= 0) {
    return res.status(400).json({ message: 'Invalid category ID' });
  }

  try {
    // Get the uploaded file information from multer
    const photo = req.file ? req.file.filename : null;

    const insertQuery = `
      INSERT INTO cours (titre, description, prix, categorieId, photo)
      VALUES (:titre, :description, :prix, :categorieId, :photo)
    `;

    const replacements = { titre, description, prix, categorieId, photo };

    // Start a transaction to ensure both insertions succeed or fail together
    const transaction = await sequelize.transaction();

    try {
      // Insert into cours table
      const [coursId] = await sequelize.query(insertQuery, {
        replacements,
        type: QueryTypes.INSERT,
        transaction,
      });

      // Insert into usercours table
      const insertUserCoursQuery = `
        INSERT INTO usercours (user_id, cours_id)
        VALUES (:userId, :coursId)
      `;

      await sequelize.query(insertUserCoursQuery, {
        replacements: { userId, coursId },
        type: QueryTypes.INSERT,
        transaction,
      });

      // Commit the transaction if everything is successful
      await transaction.commit();

      res.status(201).json({ message: 'Course created successfully' });
    } catch (insertError) {
      // Rollback the transaction if there's an error
      await transaction.rollback();
      throw insertError; // Propagate the error to the outer catch block
    }
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

  const transaction = await sequelize.transaction();

  try {
    // Delete related PDF chapters first
    const deletePdfChapitresQuery = `
      DELETE FROM pdfchapitre
      WHERE chapitre_id IN (SELECT chapitre_id FROM chapitre WHERE cours_id = :selectedCoursId)
    `;

    await sequelize.query(deletePdfChapitresQuery, {
      replacements: { selectedCoursId },
      type: QueryTypes.DELETE,
      transaction,
    });

    // Delete related chapters
    const deleteChapitresQuery = `
      DELETE FROM chapitre WHERE cours_id = :selectedCoursId
    `;

    await sequelize.query(deleteChapitresQuery, {
      replacements: { selectedCoursId },
      type: QueryTypes.DELETE,
      transaction,
    });

    // Delete the course
    const deleteCoursQuery = `
      DELETE FROM cours WHERE id = :selectedCoursId
    `;

    await sequelize.query(deleteCoursQuery, {
      replacements: { selectedCoursId },
      type: QueryTypes.DELETE,
      transaction,
    });

    await transaction.commit();
    res.status(200).json({ message: 'Course and related chapters deleted successfully' });
  } catch (error) {
    await transaction.rollback();
    console.error('Error deleting course:', error);
    res.status(500).send('Server Error');
  }
};


// Function to update a course by ID
const updateCours = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { titre, description, prix } = req.body;
    const photo = req.file ? req.file.filename : null;

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }

    let updateQuery = 'UPDATE cours SET';
    const replacements = {};

    // Conditionally append each field to the query and replacements object
    if (titre) {
      updateQuery += ' titre = :titre,';
      replacements.titre = titre;
    }
    if (description) {
      updateQuery += ' description = :description,';
      replacements.description = description;
    }
    if (prix) {
      updateQuery += ' prix = :prix,';
      replacements.prix = prix;
    }
    if (photo) {
      updateQuery += ' photo = :photo,';
      replacements.photo = photo;
    }

    // Check if there is at least one field to update
    if (Object.keys(replacements).length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    // Remove the last comma and add the WHERE clause
    updateQuery = updateQuery.slice(0, -1) + ' WHERE id = :id';
    replacements.id = id;

    // Execute the update query
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
const getCoursById = async (req, res) => {
  try {
      const coursId = req.params.coursid;
      const cours = await Cours.findByPk(coursId); // Use findByPk instead of findById
      if (!cours) {
          return res.status(404).json({ message: 'Course not found' });
      }
      res.json(cours);
  } catch (error) {
      console.error('Error fetching course by ID:', error);
      res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getCoursByCategorieId,
  createCours,
  deleteCours,
  updateCours,
  getCoursById
};


