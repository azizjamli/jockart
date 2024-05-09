const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');

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
  description: DataTypes.TEXT,
});

module.exports = Categorie;
