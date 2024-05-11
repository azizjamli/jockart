require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const userRoutes = require('./routes/userroutes');

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

app.use(cookieParser());


// Use the user routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
