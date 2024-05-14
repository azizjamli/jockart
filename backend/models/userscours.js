const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig'); // Import the sequelize object from your configuration file
const User = require('./users'); // Import the User model
const Cours = require('./cours'); // Import the Cours model

const usercours = sequelize.define('usercours', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
}, {
  tableName: 'usercours', // Specify the table name if different from the model name
  timestamps: true, // Enable timestamps (createdAt and updatedAt)
  underscored: true, // Use snake_case for column names
});

// Define foreign key associations
usercours.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
usercours.belongsTo(Cours, { foreignKey: 'coursId', onDelete: 'CASCADE' });

module.exports = usercours;
