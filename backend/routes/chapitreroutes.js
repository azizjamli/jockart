const express = require('express');
const router = express.Router();
const { getChapitresByCoursId } = require('../controllers/chapitrecontroller');

// Define the route to get chapters by course ID
router.get('/getChapitresByCoursId/:coursId', getChapitresByCoursId);

module.exports = router;
