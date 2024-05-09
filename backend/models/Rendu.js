const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');

const Rendu = sequelize.define('Rendu', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  datedepot: DataTypes.DATE,
  fichierrendus: DataTypes.STRING,
});

module.exports = Rendu;
