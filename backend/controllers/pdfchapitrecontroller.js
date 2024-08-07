const PdfChapitre = require('../models/PdfChapitre');
const sequelize = require('../dbConfig');
const fs = require('fs');
const path = require('path');


// Get PDF chapitres by chapitre ID
const getPdfChapitresByChapitreId = async (req, res) => {
  const chapitreId = parseInt(req.params.chapitreId);

  if (isNaN(chapitreId) || chapitreId <= 0) {
    return res.status(400).json({ message: 'Invalid chapitre ID' });
  }

  try {
    const pdfChapitres = await PdfChapitre.findAll({
      where: { chapitre_id: chapitreId },
    });

    if (pdfChapitres.length === 0) {
      return res.status(404).json({ message: 'No PDF chapters found for this chapitre ID' });
    }

    // Map PDFs to include file path
    const pdfsWithFilePath = pdfChapitres.map(pdf => ({
      ...pdf.toJSON(),
      pdf_file_path: pdf.pdf_content.replace(/\\/g, '/') // Convert backslashes to forward slashes
    }));

    res.json(pdfsWithFilePath);
  } catch (error) {
    console.error('Error fetching PDF chapitres:', error);
    res.status(500).send('Server Error');
  }
};



// Create a new PDF chapitre
const createPdfChapitre = async (req, res) => {
  const chapitreId = parseInt(req.params.chapitreId);

  if (isNaN(chapitreId) || chapitreId <= 0) {
    return res.status(400).json({ message: 'Invalid chapitre ID' });
  }

  if (!req.file) {
    return res.status(400).json({ message: 'PDF file is required' });
  }

  const pdfName = req.body.title;
  const pdfFileName = req.file.filename; // Get the filename from req.file

  try {
    const newPdfChapitre = await PdfChapitre.create({
      chapitre_id: chapitreId,
      pdf_name: pdfName,
      pdf_content: pdfFileName // Store the filename instead of the path
    });

    res.status(201).json(newPdfChapitre);
  } catch (error) {
    console.error('Error creating PDF chapitre:', error);
    res.status(500).send('Server Error');
  }
};


// Delete a PDF chapitre by ID
// Delete a PDF chapitre by ID
const deletePdfChapitre = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ message: 'Invalid PDF chapitre ID' });
  }

  try {
    const pdfChapitre = await PdfChapitre.findByPk(id);

    if (!pdfChapitre) {
      return res.status(404).json({ message: 'PDF chapitre not found' });
    }

    // Get the full path of the PDF file
    const pdfFilePath = path.join(__dirname, '..', 'uploads', 'pdfchapitres', pdfChapitre.pdf_content);

    // Delete the PDF file from the uploads folder
    fs.unlinkSync(pdfFilePath);

    // Delete the PDF chapitre from the database
    await pdfChapitre.destroy();

    res.status(200).json({ message: 'PDF chapitre deleted successfully' });
  } catch (error) {
    console.error('Error deleting PDF chapitre:', error);
    res.status(500).send('Server Error');
  }
};


module.exports = {
  getPdfChapitresByChapitreId,
  createPdfChapitre,
  deletePdfChapitre,
};
