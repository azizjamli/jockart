// jockart/backend/app.js

const express = require('express');
const dbConnection = require('./dbConfig'); // Importez la configuration de la base de données
const apiRoutes = require('./routes/apiRoutes'); // Importez vos routes API

const app = express();

// Middleware
app.use(express.json());

// Utilisez vos routes API
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
