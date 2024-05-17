const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig');

const SeanceEnLigne = sequelize.define('SeanceEnLigne', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  link: {
    type: DataTypes.STRING, // Modify data type and length as needed
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY, // Modify data type as needed
    allowNull: false,
  },
  heure: {
    type: DataTypes.TIME, // Define the new column "heure" with data type TIME
    allowNull: true, // Modify allowNull as per your requirement
  },
  cours_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Cours', // Name of the referenced model
      key: 'id', // Name of the referenced column
    },
  },
}, {
  tableName: 'seanceenligne', // Specify the actual table name in your database
  timestamps: false,
});

module.exports = SeanceEnLigne;
