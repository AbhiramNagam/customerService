const mysql = require('mysql');

// Create a connection pool to manage connections
const pool = mysql.createPool({
  connectionLimit: 10, // Adjust as needed
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'RootmySQL#753!',
  database: 'complaints'
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

// Example query to fetch users from the database
pool.query('SELECT * FROM users', (err, results) => {
  if (err) {
    console.error('Error executing query:', err);
    return;
  }
  console.log('Users:', results);
});

// Don't forget to end the pool when your application exits
// pool.end();
// Don't forget to end the pool when your application exits
pool.end((err) => {
    if (err) {
      console.error('Error ending pool:', err);
      return;
    }
    console.log('Connection pool closed');
  });
