const PdfChapitre = require('../models/PdfChapitre');
const sequelize = require('../dbConfig');
const fs = require('fs');

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

    const pdfsWithBase64Content = pdfChapitres.map(pdf => {
      const base64Content = pdf.pdf_content ? pdf.pdf_content.toString('base64') : null;
      console.log(`Base64 Content for PDF ID ${pdf.pdf_id}: ${base64Content}`);
      return {
        ...pdf.toJSON(),
        pdf_content: base64Content
      };
    });

    res.json(pdfsWithBase64Content);
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
  const pdfPath = req.file.path;

  try {
    const newPdfChapitre = await PdfChapitre.create({
      chapitre_id: chapitreId,
      pdf_name: pdfName,
      pdf_content: pdfPath
    });

    res.status(201).json(newPdfChapitre);
  } catch (error) {
    console.error('Error creating PDF chapitre:', error);
    res.status(500).send('Server Error');
  }
};

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

    if (pdfChapitre.pdf_content) {
      fs.unlinkSync(pdfChapitre.pdf_content);
    }

    await pdfChapitre.destroy();

    res.status(200).json({ message: 'PDF chapitre deleted successfully' });
  } catch (error) {
    console.error('Error deleting PDF chapitre:', error);
    res.status(500).send('Server Error');
  }
};

// Update a PDF chapitre by ID
const updatePdfChapitre = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ message: 'Invalid PDF chapitre ID' });
  }

  if (!req.file) {
    return res.status(400).json({ message: 'PDF file is required' });
  }

  const pdfPath = req.file.path;

  try {
    const pdfChapitre = await PdfChapitre.findByPk(id);

    if (!pdfChapitre) {
      return res.status(404).json({ message: 'PDF chapitre not found' });
    }

    if (pdfChapitre.pdf_content) {
      fs.unlinkSync(pdfChapitre.pdf_content);
    }

    pdfChapitre.pdf_content = pdfPath;

    await pdfChapitre.save();

    res.status(200).json(pdfChapitre);
  } catch (error) {
    console.error('Error updating PDF chapitre:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getPdfChapitresByChapitreId,
  createPdfChapitre,
  deletePdfChapitre,
  updatePdfChapitre
};
