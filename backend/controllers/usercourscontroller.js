const express = require('express');
const router = express.Router();
const usercours = require('../models/userscours');
const User = require('../models/users');
const Cours = require('../models/cours');
const { Op, Sequelize, QueryTypes } = require('sequelize');
const sequelize = require('../dbConfig'); // Import the sequelize instance

const coursfinder = async (req, res) => {
  try {
    const userID = req.query.userId;
    const selectedCategoryId = req.query.selectedCategoryId;

    if (!userID || !selectedCategoryId) {
      return res.status(400).json({ error: 'User ID or Selected Category ID missing in query parameters' });
    }

    const userCourses = await usercours.findAll({
      attributes: ['createdAt', 'updatedAt', 'coursId'],
      include: [
        {
          model: Cours,
          attributes: ['id', 'titre', 'description', 'prix', 'photo', 'categorieId'],
          where: { categorieId: selectedCategoryId },
        },
      ],
      where: { userId: userID },
    });

    res.status(200).json(userCourses);
  } catch (error) {
    console.error('Error fetching user courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const coursfindernouser = async (req, res) => {
  try {
    const userID = req.query.userId;
    const selectedCategoryId = req.query.selectedCategoryId;

    if (!userID || !selectedCategoryId) {
      return res.status(400).json({ error: 'User ID or Selected Category ID missing in query parameters' });
    }

    // Main query to get courses that the user has not added
    const coursesNotAdded = await Cours.findAll({
      where: {
        categorieId: selectedCategoryId,
        id: {
          [Op.notIn]: Sequelize.literal(`(
            SELECT \`cours_id\`
            FROM \`usercours\`
            WHERE \`user_id\` = ${userID}
          )`)
        }
      },
      attributes: ['id', 'titre', 'description', 'prix', 'photo', 'categorieId']
    });

    res.status(200).json(coursesNotAdded);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const allcoursinusercours = async (req, res) => {
  try {
    const courses = await Cours.findAll();

    if (!courses || courses.length === 0) {
      return res.status(404).json({ error: 'No courses found' });
    }

    const userId = 1; // or get the userId from req if needed, e.g., req.user.id

    const promises = courses.map(async (course) => {
      await usercours.create({ coursId: course.id, userId });
    });

    await Promise.all(promises);

    res.status(200).json({ message: 'Courses added to usercours table successfully' });
  } catch (error) {
    console.error('Error adding courses to usercours:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const addCourseToUser = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({ error: 'User ID or Course ID missing in request body' });
    }

    // Check if the course and user exist (optional, depending on your application's requirements)
    // You can remove these checks if you are sure that the provided userId and courseId are valid

    // Construct the SQL INSERT statement
    const insertQuery = `
      INSERT INTO usercours (user_id, cours_id, created_at, updated_at)
      VALUES (?, ?, NOW(), NOW())
    `;

    // Execute the SQL query
    await sequelize.query(insertQuery, {
      replacements: [userId, courseId],
      type: QueryTypes.INSERT,
    });

    res.status(200).json({ message: 'Course added to user successfully' });
  } catch (error) {
    console.error('Error adding course to user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const getCoursUsers = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    if (!courseId) {
      return res.status(400).json({ error: 'Course ID missing in request parameters' });
    }

    // Query to find user IDs who have the given course ID in the usercours table
    const userCourses = await usercours.findAll({
      where: { coursId: courseId },
      attributes: ['userId'],
    });

    // Extract user IDs from the result
    const userIds = userCourses.map(uc => uc.userId);

    if (userIds.length === 0) {
      return res.status(404).json({ message: 'No users found for this course' });
    }

    // Query to find users with the extracted user IDs and etudiant role
    const usersWithCourse = await User.findAll({
      where: {
        id: userIds,
        role: 'etudiant', // Assuming 'etudiant' is the role name for students
      },
    });

    res.status(200).json(usersWithCourse);
  } catch (error) {
    console.error('Error fetching users for course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const getCoursnotUsers = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    if (!courseId) {
      return res.status(400).json({ error: 'Course ID missing in request parameters' });
    }

    // Query to find user IDs who have the given course ID in the usercours table
    const userCourses = await usercours.findAll({
      where: { coursId: courseId },
      attributes: ['userId'],
    });

    // Extract user IDs from the result
    const userIds = userCourses.map(uc => uc.userId);

    if (userIds.length === 0) {
      return res.status(404).json({ message: 'No users found for this course' });
    }

    // Query to find users with user IDs not in the extracted user IDs and etudiant role
    const usersWithDifferentRole = await User.findAll({
      where: {
        id: { [Op.notIn]: userIds }, // Find users whose IDs are not in the extracted user IDs
        role: 'etudiant', // Assuming 'etudiant' is the role name for students
      },
    });

    res.status(200).json(usersWithDifferentRole);
  } catch (error) {
    console.error('Error fetching users with different role for course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCoursnotUsersformateur = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    if (!courseId) {
      return res.status(400).json({ error: 'Course ID missing in request parameters' });
    }

    // Query to find user IDs who have the given course ID in the usercours table
    const userCourses = await usercours.findAll({
      where: { coursId: courseId },
      attributes: ['userId'],
    });

    // Extract user IDs from the result
    const userIds = userCourses.map(uc => uc.userId);

    if (userIds.length === 0) {
      return res.status(404).json({ message: 'No users found for this course' });
    }

    // Query to find users with user IDs not in the extracted user IDs and etudiant role
    const usersWithDifferentRole = await User.findAll({
      where: {
        id: { [Op.notIn]: userIds }, // Find users whose IDs are not in the extracted user IDs
        role: 'formateur', // Assuming 'formateur' is the role name for trainers
      },
    });

    res.status(200).json(usersWithDifferentRole);
  } catch (error) {
    console.error('Error fetching users with different role for course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const getCoursUsersFormateur = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    if (!courseId) {
      return res.status(400).json({ error: 'Course ID missing in request parameters' });
    }

    // Query to find user IDs who have the given course ID in the usercours table
    const userCourses = await usercours.findAll({
      where: { coursId: courseId },
      attributes: ['userId'],
    });

    // Extract user IDs from the result
    const userIds = userCourses.map(uc => uc.userId);

    if (userIds.length === 0) {
      return res.status(404).json({ message: 'No users found for this course' });
    }

    // Query to find users with the extracted user IDs and formateur role
    const usersWithCourse = await User.findAll({
      where: {
        id: userIds,
        role: 'formateur', // Assuming 'formateur' is the role name for trainers
      },
    });

    res.status(200).json(usersWithCourse);
  } catch (error) {
    console.error('Error fetching users for course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const createRowInUserCours = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({ error: 'User ID or Course ID missing in request body' });
    }

    // Check if the course and user exist (optional, depending on your application's requirements)
    // You can remove these checks if you are sure that the provided userId and courseId are valid

    // Construct the SQL INSERT statement
    const insertQuery = `
      INSERT INTO usercours (user_id, cours_id, created_at, updated_at)
      VALUES (?, ?, NOW(), NOW())
    `;

    // Execute the SQL query
    await sequelize.query(insertQuery, {
      replacements: [userId, courseId],
      type: QueryTypes.INSERT,
    });

    res.status(200).json({ message: 'Row created in usercours successfully' });
  } catch (error) {
    console.error('Error creating row in usercours:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const deleteRowFromUserCours = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({ error: 'User ID or Course ID missing in request parameters' });
    }

    // Check if the row exists before attempting to delete (optional, depending on your application's requirements)
    const existingRow = await usercours.findOne({ where: { userId, coursId: courseId } });
    if (!existingRow) {
      return res.status(404).json({ error: 'Row not found in usercours' });
    }

    // Delete the row from usercours
    await usercours.destroy({ where: { userId, coursId: courseId } });

    res.status(200).json({ message: 'Row deleted from usercours successfully' });
  } catch (error) {
    console.error('Error deleting row from usercours:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = {
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
   // Add the getCoursUsers function to the exports
};