const express = require('express');
const router = express.Router();
const { getCoursByCategorieId, createCours, deleteCours } = require('../controllers/courscontroller');

// GET /api/cours/getCoursByCategorieId/:categorieId - Get courses by category ID
router.get('/getCoursByCategorieId/:categorieId', getCoursByCategorieId);

// POST /api/cours/createCours/:categorieId - Create a new course
router.post('/createCours/:categorieId', createCours);

// DELETE /api/cours/deleteCours/:courseId - Delete a course by ID
router.delete('/deleteCours/:id', deleteCours);

module.exports = router;
