const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;


const authChecker = (req, res, next) => {
    // Get the token from the HTTP-only cookie
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded.userId; // Attach the user ID to the request object
      next(); // Call the next middleware or route handler
    } catch (error) {
      console.error('Authentication error:', error);
      return res.status(401).json({ error: 'Unauthorized' });
    }
  };
  
  module.exports = authChecker;
  