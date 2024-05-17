const express = require('express');
const router = express.Router();
const { getSeanceEnLigneByCoursId } = require('../controllers/seanceenlignecontroller');

// Define the route to get SeanceEnLigne entries by course ID
router.get('/getSeanceEnLigneByCoursId/:coursId', getSeanceEnLigneByCoursId);

module.exports = router;
