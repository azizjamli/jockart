const express = require('express');
const router = express.Router();
const { getCoursByCategorieId } = require('../controllers/courscontroller');

// GET /api/cours/getCoursByCategorieId/:categorieId - Get courses by category ID
router.get('/getCoursByCategorieId/:categorieId', getCoursByCategorieId);

module.exports = router;
