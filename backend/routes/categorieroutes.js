const express = require('express');
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/categoriecontroller');

// POST /api/categories/createCategory - Create a new category
router.post('/createCategory', createCategory);

// GET /api/categories/getAllCategories - Get all categories
router.get('/getAllCategories', getAllCategories);

// GET /api/categories/getCategoryById/:id - Get a category by ID
router.get('/getCategoryById/:id', getCategoryById);

// POST /api/categories/updateCategory/:id - Update a category by ID
router.post('/updateCategory/:id', updateCategory);

// POST /api/categories/deleteCategory/:id - Delete a category by ID
router.post('/deleteCategory/:id', deleteCategory);

module.exports = router;
