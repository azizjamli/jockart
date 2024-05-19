const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userroutes');
const categorieRouter = require('./routes/categorieroutes');
const usercoursRouter = require('./routes/usercoursroutes');
const chapitrerouter = require('./routes/chapitreroutes');
const pdfchapitreroutes = require('./routes/pdfchapitreroutes');
const videoroutes = require('./routes/videoroutes');
const seanceenligneRoutes = require('./routes/seanceenligneroutes');
const coursRoutes = require('./routes/coursroutes'); // Import the coursroutes module

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes with specific origin and credentials
app.use(cors({
  origin: 'http://localhost:3000', // Specify your frontend domain
  credentials: true,
}));

app.use(cookieParser());

// Use the user routes
app.use('/api/users', userRoutes);
app.use('/api/categories', categorieRouter);
app.use('/api/usercours', usercoursRouter);
app.use('/api/chapitre', chapitrerouter);
app.use('/api/pdfchapitre', pdfchapitreroutes);

// Use the video routes
app.use('/api/videos', videoroutes);

// Use the seanceenligne routes
app.use('/api/seanceenligne', seanceenligneRoutes);

// Use the cours routes
app.use('/api/cours', coursRoutes); // Add this line to use coursRoutes

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
