const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig');

const Categorie = sequelize.define('Categorie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Categorie;
