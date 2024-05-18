const Sequelize = require('sequelize');
const { Op } = Sequelize; // Import Sequelize operators

const SeanceEnLigne = require('../models/seanceenligne');

const getSeanceEnLigneByCoursId = async (req, res) => {
  const coursId = parseInt(req.params.coursId);

  if (isNaN(coursId) || coursId <= 0) {
    return res.status(400).json({ message: 'Invalid course ID' });
  }

  try {
    // Get the current date
    const currentDate = new Date();

    console.log('Current Date:', currentDate); // Debugging statement

    // Fetch SeanceEnLigne entries based on the cours_id and date condition
    const seanceEnLigneEntries = await SeanceEnLigne.findAll({
      where: {
        cours_id: coursId,
        date: { [Op.gte]: currentDate }, // Use the gte (greater than or equal) operator
      },
    });

    if (seanceEnLigneEntries.length === 0) {
      return res.status(404).json({ message: 'No sessions found for this course ID and date' });
    }

    res.json(seanceEnLigneEntries);
  } catch (error) {
    console.error('Error fetching SeanceEnLigne entries:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getSeanceEnLigneByCoursId
};
