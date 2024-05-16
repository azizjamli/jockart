const express = require('express');
const router = express.Router();
const { coursfinder , coursfindernouser , allcoursinusercours , addCourseToUser} = require('../controllers/usercourscontroller');
//const cookieJwtAuth = require('../middleware/cookieJwtAuth');


router.get('/coursfinder', coursfinder);
router.get('/coursfindernouser', coursfindernouser);
router.get('/allcoursinusercours', allcoursinusercours);
router.post('/addCourseToUser' , addCourseToUser);




// GET /api/user/profile - User profile route with middleware

module.exports = router;
 