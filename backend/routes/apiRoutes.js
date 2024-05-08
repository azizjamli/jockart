// jockart/backend/routes/apiRoutes.js

const express = require('express');
const dbConnection = require('../dbConfig'); // Importez la configuration de la base de données

const router = express.Router();

// Exemple de route pour récupérer des données depuis la base de données
router.get('/users', (req, res) => {
    dbConnection.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Ajoutez d'autres routes ici

module.exports = router;
