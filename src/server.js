const express = require('express');
const pool = require('./db'); // Import the database connection pool

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json()); // Add JSON body parser middleware

// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// POST route for user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Query to check if the username and password match
  const sql = 'SELECT * FROM userlogin WHERE username = ? AND password = ?';
  pool.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.length > 0) {
      // User authenticated successfully
      res.status(200).send('Login successful');
    } else {
      // Authentication failed
      res.status(401).send('Incorrect username or password');
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
