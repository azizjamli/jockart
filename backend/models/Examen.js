const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');

const Examen = sequelize.define('Examen', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  datedebut: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  duree: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fichierexamen: DataTypes.STRING,
});

module.exports = Examen;
