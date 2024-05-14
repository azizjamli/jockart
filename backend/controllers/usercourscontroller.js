const express = require('express');
const router = express.Router();

const { UserCours } = require('../models/userscours');

// CREATE (POST)

const coursfinder = async (req, res) => {


    try {
      // Extract userID and selectedCategoryId from request headers
      const userID = req.headers.userid;
      const selectedCategoryId = req.headers.selectedCategoryId;
  
      if (!userID || !selectedCategoryId) {
        return res.status(400).json({ error: 'User ID or Selected Category ID missing in headers' });
      }
  
      // Query usercours table to get courses for the given user ID and category ID
      const usercourses = await usercours.findAll({
        where: { userId: userID },
        include: {
          model: Cours,
          where: { categorieId: selectedCategoryId },
        },
      });
  
      // Extract the courses from the query result
      const courses = userCourses.map(userCourse => userCourse.Cours);
  
      res.status(200).json(courses);
    } catch (error) {
      console.error('Error fetching user courses:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  module.exports = {
    coursfinder,
  };
  
