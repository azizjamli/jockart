const express = require('express');
const router = express.Router();
const { getVideosByChapitreId } = require('../controllers/videocontroller');

// Route to get videos by chapitre_id
router.get('/getVideosByChapitreId/:chapitreId', getVideosByChapitreId);

module.exports = router;
