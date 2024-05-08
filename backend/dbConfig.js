// dbConfig.js

const mysql = require('mysql2');

const dbConnection = mysql.createConnection({
    host: 'localhost', // ou l'adresse IP de votre serveur MySQL
    user: 'votre_nom_utilisateur',
    password: 'votre_mot_de_passe',
    database: 'nom_de_votre_base_de_donnees'
});

module.exports = dbConnection;
