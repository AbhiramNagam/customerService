const mysql = require('mysql');

// Create a connection pool to manage connections
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'RootmySQL#753!',
  database: 'customerServiceDatabase' // Change the database name
});

// Check if the connection pool has been created successfully
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');

  // Release the connection back to the pool
  connection.release();
});

module.exports = pool;
