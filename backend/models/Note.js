const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');

const Note = sequelize.define('Note', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  note: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  commentaire: DataTypes.TEXT,
});

module.exports = Note;
