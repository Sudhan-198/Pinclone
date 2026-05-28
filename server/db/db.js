const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./pinterest.db");

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      email TEXT UNIQUE,
      password TEXT,
      bio TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      image TEXT,
      userId INTEGER,
      username TEXT,
      bio TEXT,
      likedBy TEXT DEFAULT ''
    )
  `);

});

module.exports = db;