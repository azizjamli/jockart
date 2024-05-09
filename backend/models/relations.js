const Utilisateur = require('./models/Utilisateur');
const Rendu = require('./models/Rendu');
const Note = require('./models/Note');
const Cours = require('./models/Cours');
const Chapitre = require('./models/Chapitre');
const Examen = require('./models/Examen');
const Certification = require('./models/Certification');
const Categorie = require('./models/Categorie');
const sequelize = require('./sequelize-config');

Utilisateur.hasMany(Rendu);
Rendu.belongsTo(Utilisateur);

Utilisateur.hasMany(Note);
Note.belongsTo(Utilisateur);

Cours.hasMany(Chapitre);
Chapitre.belongsTo(Cours);

Cours.hasMany(Examen);
Examen.belongsTo(Cours);

Cours.hasMany(Certification);
Certification.belongsTo(Cours);

Categorie.hasMany(Cours);
Cours.belongsTo(Categorie);

// D'autres relations à définir si nécessaire

sequelize.sync(); // Synchronisez vos modèles avec la base de données
