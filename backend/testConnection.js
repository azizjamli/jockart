// Import the Sequelize instance from dbConfig.js
const sequelize = require('./dbConfig');

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection successful.');

    // Example query to test the connection
    sequelize.query('SELECT * FROM users')
      .then((results) => {
        console.log('Query results:', results);
      })
      .catch((queryErr) => {
        console.error('Error executing query:', queryErr);
      });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
