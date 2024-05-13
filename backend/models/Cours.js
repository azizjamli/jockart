const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');
const Categorie = require('./categorie'); // Import the Categorie model

const Cours = sequelize.define('Cours', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  prix: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  categorieId: { // Foreign key for Categorie ID
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Categorie, // Referencing the Categorie model
      key: 'id', // Primary key of the Categorie model
    },
  },
});

// Define the many-to-many association with User
Cours.belongsToMany(User, { through: 'UserCours' });
User.belongsToMany(Cours, { through: 'UserCours' });

module.exports = Cours;