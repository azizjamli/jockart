const express = require('express');
const router = express.Router();
const authChecker = require('../middleware/cookieJwtAuth');

// GET /api/check-auth - Check if user is authenticated
router.get('/check-auth', authChecker, (req, res) => {
  // If the middleware is reached, the user is authenticated
  res.status(200).json({ message: 'Authenticated', user: req.user });
});

module.exports = router;
