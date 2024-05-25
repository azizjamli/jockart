const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.ENUM('etudiant', 'formateur', 'admin'),
    allowNull: false,
    defaultValue: 'etudiant',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const hashedPassword = bcrypt.hashSync(value, bcrypt.genSaltSync(10));
      this.setDataValue('password', hashedPassword);
    },
  },
  numtel: DataTypes.STRING,
  photo: {
    type: DataTypes.STRING, // Changed type to VARCHAR(255)
    allowNull: true, // Allow null if no photo is uploaded
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: true,
});

module.exports = User;
