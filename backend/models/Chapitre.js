const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');

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

module.exports = Chapitre;
