const mysql = require('mysql2');
require('dotenv').config();
// using .env to hide sensitive information. connects to server
const db = mysql.createConnection({
  host: 'localhost',
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PW
});


module.exports = db;