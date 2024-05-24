const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {
  getPdfChapitresByChapitreId,
  createPdfChapitre,
  deletePdfChapitre,
} = require('../controllers/pdfchapitrecontroller');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/pdfchapitres')); // Save files to uploads/pdfchapitres
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp to avoid filename conflicts
  }
});

// Initialize upload variable
const upload = multer({ storage: storage });

// Route to get PDF chapitres by chapitre_id
router.get('/getPdfChapitresByChapitreId/:chapitreId', getPdfChapitresByChapitreId);

// POST /api/pdfchapitres/createPdfChapitre/:chapitreId - Create a new PDF chapitre
router.post('/createPdfChapitre/:chapitreId', upload.single('pdf'), createPdfChapitre);

// DELETE /api/pdfchapitres/deletePdfChapitre/:id - Delete a PDF chapitre by ID
router.delete('/deletePdfChapitre/:id', deletePdfChapitre);

// PUT /api/pdfchapitres/updatePdfChapitre/:id - Update a PDF chapitre by ID

module.exports = router;
