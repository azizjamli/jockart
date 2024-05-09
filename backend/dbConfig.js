const { Sequelize } = require('sequelize');

const dbConnection = new Sequelize('jockart', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = dbConnection;
