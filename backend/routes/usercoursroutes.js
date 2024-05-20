const express = require('express');
const router = express.Router();
const { coursfinder, coursfindernouser, allcoursinusercours, addCourseToUser, getCoursUsers } = require('../controllers/usercourscontroller');

router.get('/coursfinder', coursfinder);
router.get('/coursfindernouser', coursfindernouser);
router.get('/allcoursinusercours', allcoursinusercours);
router.post('/addCourseToUser', addCourseToUser);

// New route for fetching users associated with a course
router.get('/getCoursUsers/:courseId', getCoursUsers);

module.exports = router;
