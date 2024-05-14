const express = require('express');
const router = express.Router();
const { coursfinder} = require('../controllers/usercourscontroller');
//const cookieJwtAuth = require('../middleware/cookieJwtAuth');


router.get('/coursfinder', coursfinder);


// GET /api/user/profile - User profile route with middleware

module.exports = router;
 