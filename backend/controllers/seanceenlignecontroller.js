const SeanceEnLigne = require('../models/seanceenligne');

const getSeanceEnLigneByCoursId = async (req, res) => {
  const coursId = parseInt(req.params.coursId); // Extract and parse the course ID from the request parameters

  // Check if coursId is a valid number
  if (isNaN(coursId) || coursId <= 0) {
    return res.status(400).json({ message: 'Invalid course ID' });
  }

  try {
    // Fetch SeanceEnLigne entries based on the cours_id foreign key
    const seanceEnLigneEntries = await SeanceEnLigne.findAll({
      where: { cours_id: coursId },
    });

    if (seanceEnLigneEntries.length === 0) {
      return res.status(404).json({ message: 'No sessions found for this course ID' });
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
