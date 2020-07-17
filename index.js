const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const db = require('./db')

const port = process.env.PORT

app.listen(port, () => console.log('Server up and running'))