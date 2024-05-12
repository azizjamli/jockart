const jwt = require('jsonwebtoken');
const { MY_SECRET } = process.env;

exports.cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    req.isLoggedIn = false; // Set isLoggedIn to false if no token is found

    return res.status(401).json({ error: 'No token found' });
  }

  try {
    const user = jwt.verify(token, MY_SECRET);
    req.userId = decodedToken.userId;
    req.user = user;
    req.isLoggedIn = true; // Set isLoggedIn to true if token is valid

    next();
  } catch (err) {
    res.clearCookie('token');
    return res.status(401).json({ error: 'Invalid token' });
  }
};
