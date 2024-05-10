const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userroutes = require('./routes/userroutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api/users/signin', userroutes); // Make sure this line is included
app.use('/api/users/signup', userroutes); // Make sure this line is included


// Other route definitions and error handling

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
