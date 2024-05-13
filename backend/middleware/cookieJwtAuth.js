const jwt = require('jsonwebtoken');
const { MY_SECRET } = process.env;

const cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;
  console.log('Token:', token); // Log the extracted token for debugging

  if (!token) {
    req.isLoggedIn = false; // Set isLoggedIn to false if no token is found
    return res.status(401).json({ error: 'No token found' });
  }

  // Token found, decode it if needed
  try {
    const decodedToken = jwt.verify(token, MY_SECRET);
    req.userId = decodedToken.userId; // Assuming your token contains userId
    req.user = decodedToken; // Store the decoded user information in req.user
    req.isLoggedIn = true; // Set isLoggedIn to true if token is valid

    // Log the decoded token information
    console.log('Decoded Token:', decodedToken);

    next(); // Call next() to continue to the next middleware or route handler
  } catch (err) {
    res.clearCookie('token');
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = cookieJwtAuth; // Export the middleware function
