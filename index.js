const express = require('express')
const app = express()
// const port = 3000
const bodyParser = require('body-parser')
const router = require('./routes')
// .env
const dotenv = require('dotenv');
dotenv.config();

const path = require('path')
//import library CORS
const cors = require('cors')
//use cors
app.use(cors([
  {origin:'http://localhost:3000'},

  ]))
//cara pertama kita input kita ada di json (di postman: body > Raw > Type = JSON)
app.use(bodyParser.json())
//www-url-form-encoded
app.use(bodyParser.urlencoded({ extended: true }))
//form-data (multer)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
// router(app, '/api/v1',)
app.use('/api/v1', router)


app.listen(process.env.DB_PORT, () => {
  console.log(`Tickitz Backend listening on port ${process.env.DB_PORT}`)
})