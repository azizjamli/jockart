const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');

const Certification = sequelize.define('Certification', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fichiercertification: DataTypes.STRING,
});

module.exports = Certification;
