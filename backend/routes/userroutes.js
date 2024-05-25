const express = require('express');
const router = express.Router();
const { signin, signup, getInfo, uploadPhoto } = require('../controllers/usercontroller');
const multer = require('multer');
const path = require('path');

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/user')); // Save files to uploads/user folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp to avoid filename conflicts
  },
});

// Initialize upload variable
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
  fileFilter: function (req, file, cb) {
    // Check file type
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Only JPEG, JPG, or PNG files are allowed!');
    }
  },
});

// POST /api/users/signin - User sign-in route
router.post('/signin', signin);

// POST /api/users/signup - User sign-up route
router.post('/signup', signup);

// GET /api/users/getInfo - Get user info route
router.get('/getInfo', getInfo);

// POST /api/users/uploadPhoto/:userId - Upload user photo route
router.post('/uploadPhoto/:userId', upload.single('photo'), uploadPhoto);

module.exports = router;
