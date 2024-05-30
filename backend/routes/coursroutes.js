const express = require('express');
const router = express.Router();
const { getCoursByCategorieId, createCours, deleteCours, updateCours ,getCoursById } = require('../controllers/courscontroller');
const multer = require('multer');
const path = require('path');
const Categorie = require('../models/categorie');

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/cours')); // Save files to uploads/cours
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp to avoid filename conflicts
  }
});

// Initialize upload variable
const upload = multer({ storage: storage });

// GET /api/cours/getCoursByCategorieId/:categorieId - Get courses by category ID
router.get('/getCoursByCategorieId/:categorieId', getCoursByCategorieId);
router.get('/getCoursById/:coursid', getCoursById);


// POST /api/cours/createCours/:categorieId - Create a new course
router.post('/createCours/:categorieId', upload.single('photo'), createCours);

// DELETE /api/cours/deleteCours/:id - Delete a course by ID
router.delete('/deleteCours/:id', deleteCours);

// PUT /api/cours/updateCours/:id - Update a course by ID
router.put('/updateCours/:id', upload.single('photo'), updateCours);

module.exports = router;
