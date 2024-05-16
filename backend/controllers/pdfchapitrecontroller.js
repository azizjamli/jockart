const PdfChapitre = require('../models/PdfChapitre');
const sequelize = require('../dbConfig');

const getPdfChapitresByChapitreId = async (req, res) => {
  const chapitreId = parseInt(req.params.chapitreId); // Extract and parse the chapitre ID from the request parameters

  // Check if chapitreId is a valid number
  if (isNaN(chapitreId) || chapitreId <= 0) {
    return res.status(400).json({ message: 'Invalid chapitre ID' });
  }

  try {
    const pdfChapitres = await PdfChapitre.findAll({
      where: { chapitre_id: chapitreId }, // Filter by chapitre_id
    });

    if (pdfChapitres.length === 0) {
      return res.status(404).json({ message: 'No PDF chapters found for this chapitre ID' });
    }

    res.json(pdfChapitres);
  } catch (error) {
    console.error('Error fetching PDF chapitres:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getPdfChapitresByChapitreId,
};
