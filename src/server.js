// Import required modules
const express = require('express');
const pool = require('./db'); // Import the database connection pool

// Create Express app
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

// POST route to submit an issue
app.post('/submit-issue', (req, res) => {
  const { username, issueType, issueDescription } = req.body;

  // Query to insert the issue into the database
  const sql = 'INSERT INTO customer_issues (issueUser, issueType, issueDescription, issueStatus) VALUES (?, ?, ?, ?)';
  pool.query(sql, [username, issueType, issueDescription, 'pending'], (err, results) => {
    if (err) {
      console.error('Error submitting issue:', err);
      res.status(500).send('Error submitting issue');
      return;
    }

    res.status(200).send('Issue submitted successfully');
  });
});

// POST route to fetch customer issues for a specific username
app.post('/get-customer-issues', (req, res) => {
  const { username } = req.body;

  // Query to retrieve customer issues for the given username
  const sql = 'SELECT * FROM customer_issues WHERE issueUser = ?';
  pool.query(sql, [username], (err, results) => {
    if (err) {
      console.error('Error fetching customer issues:', err);
      res.status(500).send('Error fetching customer issues');
      return;
    }

    res.json(results);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
