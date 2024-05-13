const express = require('express');
const router = express.Router();
const { Cours } = require('../models/Cours'); // Assuming your model is defined in a file named 'models.js' or similar
const { User } = require('../models/users');

// CREATE (POST)
router.post('/cours', async (req, res) => {
  try {
    const { titre, description, prix } = req.body;
    const newCours = await Cours.create({ titre, description, prix });
    res.status(201).json(newCours);
  } catch (error) {
    console.error('Error creating new cours:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// READ (GET)
router.get('/cours/:id', async (req, res) => {
  try {
    const coursId = req.params.id;
    const cours = await Cours.findByPk(coursId);
    if (!cours) {
      return res.status(404).json({ error: 'Cours not found' });
    }
    res.status(200).json(cours);
  } catch (error) {
    console.error('Error fetching cours:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// UPDATE (PUT)
router.put('/cours/:id', async (req, res) => {
  try {
    const coursId = req.params.id;
    const { titre, description, prix } = req.body;
    const updatedCours = await Cours.update({ titre, description, prix }, { where: { id: coursId } });
    if (updatedCours[0] === 0) {
      return res.status(404).json({ error: 'Cours not found' });
    }
    res.status(200).json({ message: 'Cours updated successfully' });
  } catch (error) {
    console.error('Error updating cours:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE
router.delete('/cours/:id', async (req, res) => {
  try {
    const coursId = req.params.id;
    const deletedCours = await Cours.destroy({ where: { id: coursId } });
    if (deletedCours === 0) {
      return res.status(404).json({ error: 'Cours not found' });
    }
    res.status(200).json({ message: 'Cours deleted successfully' });
  } catch (error) {
    console.error('Error deleting cours:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch courses by category ID
  router.get('/cours/byCategory/:categoryId', async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      const courses = await Cours.findAll({ where: { categoryId } });
      res.status(200).json(courses);
    } catch (error) {
      console.error('Error fetching cours by category:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


router.post('/cours/add', async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    // Check if the user and course exist
    const user = await User.findByPk(userId);
    const cours = await Cours.findByPk(courseId);

    if (!user || !cours) {
      return res.status(404).json({ error: 'User or course not found' });
    }

    // Add the course to the user's courses
    await user.addCours(cours);

    res.status(201).json({ message: 'Course added successfully' });
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get courses for a user
router.get('/cours/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId, { include: Cours });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user.Cours);
  } catch (error) {
    console.error('Error fetching user courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Get user's courses for a specific category
router.get('/cours/user/:userId/category/:categoryId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const categoryId = req.params.categoryId;

    // Fetch user by userId including their courses
    const user = await User.findByPk(userId, { include: Cours });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Filter user's courses by categoryId
    const userCoursesInCategory = user.Cours.filter(course => course.categoryId === categoryId);

    res.status(200).json(userCoursesInCategory);
  } catch (error) {
    console.error('Error fetching user courses by category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Get courses for a category that are not added to a user
router.get('/cours/category/:categoryId/notAddedToUser/:userId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const userId = req.params.userId;

    // Fetch user by userId including their courses
    const user = await User.findByPk(userId, { include: Cours });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch all courses for the given category
    const coursesInCategory = await Cours.findAll({ where: { categoryId } });

    // Filter out courses that are already added to the user
    const coursesNotAddedToUser = coursesInCategory.filter(course =>
      !user.Cours.some(userCourse => userCourse.id === course.id)
    );

    res.status(200).json(coursesNotAddedToUser);
  } catch (error) {
    console.error('Error fetching courses not added to user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




module.exports = router;
