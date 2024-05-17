const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig');

const Video = sequelize.define('Video', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  video_titre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  video: {
    type: DataTypes.BLOB('long'),
    allowNull: false,
  },
  chapitre_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Chapitre', // Name of the referenced model
      key: 'chapitre_id', // Name of the referenced column
    },
  },
}, {
  tableName: 'video', // Specify the actual table name in your database
  timestamps: false,
});

module.exports = Video;
