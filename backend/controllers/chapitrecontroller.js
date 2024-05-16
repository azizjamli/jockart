const Chapitre = require('../models/Chapitre');

const getChapitresByCoursId = async (req, res) => {
  const coursId = req.params.coursId; // Extract the course ID from the request parameters

  try {
    const chapitres = await Chapitre.findAll({
      where: { cours_id: coursId } // Use lowercase for column name 'cours_id'
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

module.exports = {
  getChapitresByCoursId
};
