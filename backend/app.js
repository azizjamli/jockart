const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./dbConfig'); 
const utilisateurRoutes = require('./routes/utilisateurRoutes'); // Import your API routes

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// API Routes
app.use('/api/users', utilisateurRoutes); // Mount user-related routes

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
