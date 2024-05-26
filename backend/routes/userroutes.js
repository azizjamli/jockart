const express = require('express');
const router = express.Router();
const { signin, signup, getInfo, uploadPhoto, updateUser } = require('../controllers/usercontroller');
const multer = require('multer');
const path = require('path');

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/user')); // Save files to uploads/user
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp to avoid filename conflicts
  }
});

const upload = multer({ storage: storage });

// POST /api/users/signin - User sign-in route
router.post('/signin', signin);

// POST /api/users/signup - User sign-up route
router.post('/signup', signup);

// GET /api/users/getInfo - Get user info route
router.get('/getInfo', getInfo);

// POST /api/users/uploadPhoto/:userId - Upload user photo route
router.post('/uploadPhoto/:userId', upload.single('photo'), uploadPhoto);

// PUT /api/users/updateUser/:userId - Update user details including photo
router.put('/updateUser/:userId', upload.single('photo'), updateUser);

module.exports = router;
