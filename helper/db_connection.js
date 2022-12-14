const mysql = require('mysql')
const dotenv = require('dotenv');
dotenv.config();

// require('dotenv').config()

const db = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE
})

db.connect((err)=> {
  if(err) {
    console.log(err)
  }
  console.log('DB CONNECTED, Beckend Tickit')
})


module.exports = db