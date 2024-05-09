// Importez le fichier dbConfig.js pour obtenir l'objet de connexion
const dbConnection = require('./dbConfig');

// Test de la connexion à la base de données
dbConnection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
    } else {
        console.log('Connexion à la base de données réussie !');

        // Exemple de requête SQL pour tester la connexion
        dbConnection.query('SELECT * FROM etudiant', (queryErr, results) => {
            if (queryErr) {
                console.error('Erreur lors de l\'exécution de la requête :', queryErr);
            } else {
                console.log('Résultats de la requête :', results);
            }
            // Fermez la connexion après avoir terminé
            dbConnection.end();
        });
    }
});
