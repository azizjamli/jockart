const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig');

const PDF = sequelize.define('PDF', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = PDF;