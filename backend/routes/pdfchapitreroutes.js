const express = require('express');
const router = express.Router();
const { getPdfChapitresByChapitreId } = require('../controllers/pdfchapitrecontroller');

// Route to get PDF chapitres by chapitre_id
router.get('/getPdfChapitresByChapitreId/:chapitreId', getPdfChapitresByChapitreId);

module.exports = router;
