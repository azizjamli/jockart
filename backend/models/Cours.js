const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig'); // Import the sequelize object from your configuration file
const Categorie = require('./categorie');
const usercours = require('./userscours');

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
  photo: {
    type: DataTypes.BLOB('long'),
    allowNull: true, // Assuming photo can be optional
    validate: {
      isUrl: true, // Ensure that the value is a valid URL (if needed)
    },
  },
  categorieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Categorie,
      key: 'id',
    },
  },
});

usercours.associate = (models) => {
  usercours.belongsTo(models.Cours, { as: 'CoursID', foreignKey: 'coursId' });
};

module.exports = Cours;
