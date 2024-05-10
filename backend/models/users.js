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
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Assurez-vous que chaque utilisateur a un email unique
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
}
, {
  tableName: 'users', // Set the table name explicitly
  timestamps: true, 
}
);

module.exports = User;
