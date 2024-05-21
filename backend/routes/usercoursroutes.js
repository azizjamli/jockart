const express = require('express');
const router = express.Router();
const {  
    coursfinder,
    coursfindernouser,
    allcoursinusercours,
    addCourseToUser,
    getCoursUsers,
    getCoursnotUsers,
    getCoursUsersFormateur,
    createRowInUserCours
  } = require('../controllers/usercourscontroller');

router.get('/coursfinder', coursfinder);
router.get('/coursfindernouser', coursfindernouser);
router.get('/allcoursinusercours', allcoursinusercours);
router.post('/addCourseToUser', addCourseToUser);

// Route to fetch users associated with a course and a specific role (e.g., 'etudiant')
router.get('/getCoursUsers/:courseId', getCoursUsers);

// Route to fetch users not associated with a course and a specific role (e.g., 'etudiant')
router.get('/getCoursnotUsers/:courseId', getCoursnotUsers);

// Route to fetch users associated with a course and a specific role (e.g., 'formateur')
router.get('/getCoursUsersFormateur/:courseId', getCoursUsersFormateur);

// Route to create a row in usercours with provided userId and courseId
router.post('/createRowInUserCours', createRowInUserCours);

module.exports = router;
