const { QueryTypes } = require('sequelize');
const sequelize = require('../dbConfig');

const getChapitresByCoursId = async (req, res) => {
  const coursId = parseInt(req.params.coursId);

  if (isNaN(coursId) || coursId <= 0) {
    return res.status(400).json({ message: 'Invalid course ID' });
  }

  try {
    const selectQuery = `
      SELECT * FROM chapitre WHERE cours_id = :coursId
    `;
    const chapitres = await sequelize.query(selectQuery, {
      replacements: { coursId },
      type: QueryTypes.SELECT,
    });

    if (chapitres.length === 0) {
      return res.status(404).json({ message: 'No chapters found for this course ID' });
    }

    res.json(chapitres);
  } catch (error) {
    console.error('Error fetching chapitres:', error);
    res.status(500).send('Server Error');
  }
};

const createChapitre = async (req, res) => {
  const { coursId, title, content } = req.body;

  if (!coursId || !title || !content) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const insertQuery = `
      INSERT INTO chapitre (cours_id, chapitre_name, description)
      VALUES (:coursId, :title, :content)
    `;

    await sequelize.query(insertQuery, {
      replacements: { coursId, title, content },
      type: QueryTypes.INSERT,
    });

    const selectQuery = `
      SELECT * FROM chapitre
      WHERE cours_id = :coursId AND chapitre_name = :title AND description = :content
      LIMIT 1
    `;
    const newChapitre = await sequelize.query(selectQuery, {
      replacements: { coursId, title, content },
      type: QueryTypes.SELECT,
    });

    res.status(201).json(newChapitre[0]);
  } catch (error) {
    console.error('Error creating chapitre:', error);
    res.status(500).send('Server Error');
  }
};

const updateChapitre = async (req, res) => {
  const chapitreId = parseInt(req.params.chapitreId);
  const { title, content } = req.body;

  if (isNaN(chapitreId) || chapitreId <= 0 || !title || !content) {
    return res.status(400).json({ message: 'Invalid chapitre ID or missing fields' });
  }

  try {
    const updateQuery = `
      UPDATE chapitre
      SET chapitre_name = :title, description = :content, updatedAt = NOW()
      WHERE chapitre_id = :chapitreId
    `;

    await sequelize.query(updateQuery, {
      replacements: { chapitreId, title, content },
      type: QueryTypes.UPDATE,
    });

    const selectQuery = `
      SELECT * FROM chapitre WHERE chapitre_id = :chapitreId
    `;
    const updatedChapitre = await sequelize.query(selectQuery, {
      replacements: { chapitreId },
      type: QueryTypes.SELECT,
    });

    res.json(updatedChapitre[0]);
  } catch (error) {
    console.error('Error updating chapitre:', error);
    res.status(500).send('Server Error');
  }
};

const deleteChapitre = async (req, res) => {
  const chapitreId = parseInt(req.params.chapitreId);

  if (isNaN(chapitreId) || chapitreId <= 0) {
    return res.status(400).json({ message: 'Invalid chapitre ID' });
  }

  try {
    // First, delete the rows in the pdfchapitre table that reference the chapitre_id
    const deletePdfChapitreQuery = `
      DELETE FROM pdfchapitre WHERE chapitre_id = :chapitreId
    `;
    await sequelize.query(deletePdfChapitreQuery, {
      replacements: { chapitreId },
      type: QueryTypes.DELETE,
    });

    // Then, delete the row in the chapitre table
    const deleteChapitreQuery = `
      DELETE FROM chapitre WHERE chapitre_id = :chapitreId
    `;
    await sequelize.query(deleteChapitreQuery, {
      replacements: { chapitreId },
      type: QueryTypes.DELETE,
    });

    res.json({ message: 'Chapitre deleted successfully' });
  } catch (error) {
    console.error('Error deleting chapitre:', error);
    res.status(500).send('Server Error');
  }
};


module.exports = {
  getChapitresByCoursId,
  createChapitre,
  updateChapitre,
  deleteChapitre,
};
