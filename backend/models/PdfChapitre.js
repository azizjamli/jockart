const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig');

const Pdfchapitre = sequelize.define('PdfChapitre', {
  pdf_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  pdf_name: {
    type: DataTypes.STRING,
    allowNull: false, // Modify as needed
  },
  pdf_content: {
    type: DataTypes.BLOB('long'),
    allowNull: false, // Modify as needed
  },
  chapitre_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // Modify as needed
    references: {
      model: 'Chapitre', // Name of the referenced model
      key: 'chapitre_id', // Name of the referenced column
    },
  },
} ,{
    tableName: 'pdfchapitre', // Specify the actual table name in your database
    timestamps: false,

  });

module.exports = Pdfchapitre;
