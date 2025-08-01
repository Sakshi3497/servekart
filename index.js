const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3000;

// ✅ Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Serve static files from client folder
app.use(express.static(path.join(__dirname, '../client')));

// ✅ Optional fallback route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// ✅ MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'servekart'
});

db.connect(err => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err);
    return;
  }
  console.log('✅ Connected to MySQL!');
});

// ✅ Handle booking form POST
app.post('/book', (req, res) => {
  const { name, phone, service, address, date } = req.body;
  const query = 'INSERT INTO bookings (name, phone, service, address, date) VALUES (?, ?, ?, ?, ?)';

  db.query(query, [name, phone, service, address, date], (err, result) => {
    if (err) {
      console.error('❌ Error inserting booking:', err);
      res.send('❌ Booking failed!');
      return;
    }
    res.send(`✅ Booking done successfully!<br>Thank you, ${name}.`);
  });
});

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});


