const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig');

const Categorie = sequelize.define('Categorie', {
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
