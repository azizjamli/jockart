const express = require('express');
const router = express.Router();
const { getCoursByCategorieId, createCours, deleteCours, updateCours } = require('../controllers/courscontroller');

// GET /api/cours/getCoursByCategorieId/:categorieId - Get courses by category ID
router.get('/getCoursByCategorieId/:categorieId', getCoursByCategorieId);

// POST /api/cours/createCours/:categorieId - Create a new course
router.post('/createCours/:categorieId', createCours);

// DELETE /api/cours/deleteCours/:id - Delete a course by ID
router.delete('/deleteCours/:id', deleteCours);

// PUT /api/cours/updateCours/:id - Update a course by ID
router.put('/updateCours/:id', updateCours);

module.exports = router;
