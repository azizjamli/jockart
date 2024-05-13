require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userroutes'); // Import user routes
const categorieRouter = require('./routes/categorieroutes'); // Import category routes

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes with specific origin and credentials
app.use(cors({
  origin: 'http://localhost:3000', // Specify your frontend domain
  credentials: true,
}));

app.use(cookieParser());

// Use the user and category routes
app.use('/api/users', userRoutes); // Define user routes
app.use('/api/categories', categorieRouter); // Define category routes

// Start the server
const PORT = process.env.PORT || 3001; // Use PORT from .env file or default to 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
