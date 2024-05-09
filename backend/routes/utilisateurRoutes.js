const express = require('express');
const router = express.Router();
const db = require('../dbConfig'); 

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Get database connection from dbConfig.js
        const connection = await db.getConnection();

        // Query the database to check if the email and password match
        const [rows] = await connection.execute('SELECT * FROM utilisateur WHERE email = ? AND motdepasse = ?', [email, password]);

        // Check if any rows were returned (i.e., user with matching credentials)
        if (rows.length > 0) {
            // Authentication successful
            res.json({ success: true, message: 'Login successful' });
        } else {
            // No user found or incorrect credentials
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Release the database connection
        await connection.release();
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;