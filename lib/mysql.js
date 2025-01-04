const { database } = require('../config.json');
const { createConnection } = require('mysql');

let con = createConnection(database);

con.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log("Database Connected!");

  // Keep the connection alive by sending a query every minute
  setInterval(() => {
    con.query('SELECT 1', (err) => {
      if (err) {
        console.error('Error executing keep-alive query:', err);
      }
    });
  }, 60000); // 60 seconds
});

module.exports = con;
