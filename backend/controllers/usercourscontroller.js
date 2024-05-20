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

    // Query to find users who have the given course ID in the userscours table
    const usersWithCourse = await User.findAll({
      include: [
        {
          model: usercours,
          where: { coursId: courseId },
        },
      ],
    });

    res.status(200).json(usersWithCourse);
  } catch (error) {
    console.error('Error fetching users for course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  coursfinder,
  coursfindernouser,
  allcoursinusercours,
  addCourseToUser,
  getCoursUsers, // Add the getCoursUsers function to the exports
};