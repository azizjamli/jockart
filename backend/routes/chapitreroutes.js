const express = require('express');
const router = express.Router();
const { 
  getChapitresByCoursId, 
  createChapitre, 
  updateChapitre, 
  deleteChapitre 
} = require('../controllers/chapitrecontroller');

// Define the route to get chapters by course ID
router.get('/getChapitresByCoursId/:coursId', getChapitresByCoursId);

// Define the route to create a new chapter
router.post('/createChapitre', createChapitre);

// Define the route to update an existing chapter
router.put('/updateChapitre/:chapitreId', updateChapitre);

// Define the route to delete a chapter
router.delete('/deleteChapitre/:chapitreId', deleteChapitre);

module.exports = router;
