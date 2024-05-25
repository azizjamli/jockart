const express = require('express');
const router = express.Router();
const { 
  getSeanceEnLigneByCoursId,
  createSeanceEnLigne,
  deleteSeanceEnLigne
} = require('../controllers/seanceenlignecontroller');

// Route to get SeanceEnLigne entries by course ID
router.get('/getSeanceEnLigneByCoursId/:coursId', getSeanceEnLigneByCoursId);

// Route to create a new SeanceEnLigne entry
router.post('/createSeanceEnLigne', createSeanceEnLigne);

// Route to delete a SeanceEnLigne entry by ID
router.delete('/deleteSeanceEnLigne/:seanceId', deleteSeanceEnLigne);

module.exports = router;
