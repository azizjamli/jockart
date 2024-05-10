const express = require('express');
const router = express.Router();
const { signin, signup } = require('../controllers/usercontroller');

// POST /api/users/signin - User sign-in route
router.post('/signin', signin);

// POST /api/users/signup - User sign-up route
router.post('/signup', signup);

module.exports = router;
