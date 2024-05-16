const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig');

const Chapitre = sequelize.define('Chapitre', {
  chapitre_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cours_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // Allow null as per your table definition
  },
  chapitre_name: {
    type: DataTypes.STRING,
    allowNull: true, // Allow null as per your table definition
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true, // Allow null as per your table definition
  },
});

module.exports = Chapitre;
