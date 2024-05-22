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
    getCoursnotUsersformateur,
    createRowInUserCours,
    deleteRowFromUserCours
  } = require('../controllers/usercourscontroller');

// GET route to find user courses
router.get('/coursfinder', coursfinder);

// GET route to find courses not added by a user
router.get('/coursfindernouser', coursfindernouser);

// GET route to find all courses in usercours
router.get('/allcoursinusercours', allcoursinusercours);

// POST route to add a course to a user
router.post('/addCourseToUser', addCourseToUser);

// GET route to fetch users associated with a course and a specific role
router.get('/getCoursUsers/:courseId', getCoursUsers);

// GET route to fetch users not associated with a course and a specific role
router.get('/getCoursnotUsers/:courseId', getCoursnotUsers);

// GET route to fetch users associated with a course and a specific role (e.g., 'formateur')
router.get('/getCoursUsersFormateur/:courseId', getCoursUsersFormateur);

// GET route to fetch users not associated with a course and a specific role
router.get('/getCoursnotUsersformateur/:courseId', getCoursnotUsersformateur);

// POST route to create a row in usercours with provided userId and courseId
router.post('/createRowInUserCours', createRowInUserCours);

// DELETE route to delete a row from usercours
router.delete('/deleteRowFromUserCours', deleteRowFromUserCours);

module.exports = router;
