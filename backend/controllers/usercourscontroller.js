const express = require('express');
const router = express.Router();
const usercours = require('../models/userscours');
const User = require('../models/users');
const Cours = require('../models/cours');
const { Op, Sequelize } = require('sequelize');
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
          as: 'Cour',
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
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ error: 'User ID missing in query parameters' });
    }

    // Find all courses from the Cours table that the user hasn't added (not in usercours table for the user)
    const coursesNotAdded = await Cours.findAll({
      include: [
        {
          model: User,
          through: {
            model: usercours,
            where: { userId: userId },
            attributes: [], // Exclude userId from the result
          },
          attributes: [], // Exclude User attributes from the result
        },
      ],
      where: { '$Users.id$': null }, // Check for courses not associated with any user
    });

    res.status(200).json(coursesNotAdded);
  } catch (error) {
    console.error('Error fetching courses not added by user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const allcoursinusercours = async (req, res) => {
  try {
    const courses = await Cours.findAll();

    if (!courses || courses.length === 0) {
      return res.status(404).json({ error: 'No courses found' });
    }

    const promises = courses.map(async (course) => {
      await usercours.create({ coursId: course.id });
    });

    await Promise.all(promises);

    res.status(200).json({ message: 'Courses added to usercours table successfully' });
  } catch (error) {
    console.error('Error adding courses to usercours:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  coursfinder,
  coursfindernouser,
  allcoursinusercours
};
