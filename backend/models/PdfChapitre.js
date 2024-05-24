const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig');

const PdfChapitre = sequelize.define('PdfChapitre', {
  pdf_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  pdf_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pdf_content: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
//      isUrl: false, // Ensure that the value is a valid URL
    }
  },
  chapitre_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Chapitre', // Name of the referenced model
      key: 'chapitre_id', // Name of the referenced column
    }
  }
}, {
  tableName: 'pdfchapitre', // Specify the actual table name in your database
  timestamps: false,
});

module.exports = PdfChapitre;
