// src/db/db.js
const sqlite3 = require('sqlite3').verbose();

// Create a SQLite database connection
const db = new sqlite3.Database('../books.db');

// Create a table to store book data if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS books (
      title TEXT,
      price REAL,
      availability TEXT,
      rating TEXT
    )
  `);
});

module.exports = db;
