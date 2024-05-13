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
    allowNull: true, // Allow null values for last name
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: true, // Allow null values for first name
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.ENUM('etudiant', 'formateur', 'admin'), // Define the role column as ENUM
    allowNull: false,
    defaultValue: 'etudiant', // Default value if not specified
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      // Hash the password before saving it to the database
      const hashedPassword = bcrypt.hashSync(value, bcrypt.genSaltSync(10));
      this.setDataValue('password', hashedPassword);
    },
  },
  numtel: DataTypes.STRING,
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: true,
});
User.belongsToMany(Cours, { through: 'UserCours' });
Cours.belongsToMany(User, { through: 'UserCours' });

module.exports = User;
