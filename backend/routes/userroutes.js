const express = require('express');
const router = express.Router();
const { signin, signup, getUserProfile } = require('../controllers/usercontroller');
const cookieJwtAuth = require('../middleware/cookieJwtAuth');

// POST /api/users/signin - User sign-in route
router.post('/signin', signin);

// POST /api/users/signup - User sign-up route
router.post('/signup', signup);

// GET /api/user/profile - User profile route with middleware
router.get('/profile', cookieJwtAuth, getUserProfile); // Use the middleware here

module.exports = router;
