const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig');
const Cours = require('./cours');
const Video = require('./video'); // Import Video model
const PDF = require('./pdf'); // Import PDF model

const Chapitre = sequelize.define('Chapitre', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ordre: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  contenu: DataTypes.TEXT,
});

// Define associations
Chapitre.belongsTo(Cours, { foreignKey: 'CoursId' });
Chapitre.hasMany(Video, { foreignKey: 'ChapitreId' }); // A Chapitre can have multiple videos
Chapitre.hasMany(PDF, { foreignKey: 'ChapitreId' }); // A Chapitre can have multiple PDFs 


module.exports = Chapitre;
