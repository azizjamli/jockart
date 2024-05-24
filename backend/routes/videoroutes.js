const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {
  getVideosByChapitreId,
  createVideo,
  deleteVideo,
} = require('../controllers/videocontroller');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/videos')); // Save files to uploads/videos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp to avoid filename conflicts
  }
});

// Initialize upload variable
const upload = multer({ storage: storage });

// Route to get videos by chapitre_id
router.get('/getVideosByChapitreId/:chapitreId', getVideosByChapitreId);

// POST /api/videos/createVideo/:chapitreId - Create a new video
router.post('/createVideo/:chapitreId', upload.single('video'), createVideo);

// DELETE /api/videos/deleteVideo/:id - Delete a video by ID
router.delete('/deleteVideo/:id', deleteVideo);

module.exports = router;
