const express = require('express');
const router = express.Router();
const { getCoursByCategorieId, createCours } = require('../controllers/courscontroller');

// GET /api/cours/getCoursByCategorieId/:categorieId - Get courses by category ID
router.get('/getCoursByCategorieId/:categorieId', getCoursByCategorieId);

// POST /api/cours/createCours/:categorieId - Create a new course
router.post('/createCours/:categorieId', createCours);

module.exports = router;
