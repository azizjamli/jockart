require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userroutes');
const categorieRouter = require('./routes/categorieroutes');
const cookieJwtAuth = require('./middleware/cookieJwtAuth'); 

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes with specific origin and credentials
const corsOptions = {
  origin: 'http://localhost:3000', // Set the specific origin of your client-side application
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

app.use(cookieParser());

// Use the user routes
app.use('/api/users', userRoutes);
app.use('/api/categories', categorieRouter);


// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
