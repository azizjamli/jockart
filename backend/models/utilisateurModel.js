const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');

const Utilisateur = sequelize.define('Utilisateur', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Assurez-vous que chaque utilisateur a un email unique
  },
  motdepasse: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numtel: DataTypes.STRING,
  datecreationcompte: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Utilisateur;
