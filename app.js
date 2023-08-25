// app.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Adi#6299@123',
  database: 'omdb_favorites'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + db.threadId);
});

// Routes
app.get('/search', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/favorites', (req, res) => {
  const query = 'SELECT * FROM favorites';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching favorites');
    } else {
      res.render('favorites', { favorites: results });
    }
  });
});

app.post('/favorite', (req, res) => {
  const { title, year, type, poster } = req.body;
  const query = 'INSERT INTO favorites (title, year, type, poster) VALUES (?, ?, ?, ?)';
  db.query(query, [title, year, type, poster], (err, _result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving favorite');
    } else {
      res.status(200).send('Favorite saved successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
