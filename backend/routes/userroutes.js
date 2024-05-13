const express = require('express');
const router = express.Router();
const { signin, signup , getInfo} = require('../controllers/usercontroller');
const cookieJwtAuth = require('../middleware/cookieJwtAuth');

// POST /api/users/signin - User sign-in route
router.post('/signin', signin);

// POST /api/users/signup - User sign-up route
router.post('/signup', signup);

router.get('/getInfo', getInfo);


// GET /api/user/profile - User profile route with middleware

module.exports = router;
