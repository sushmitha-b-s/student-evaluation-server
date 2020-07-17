const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const db = require('./db')
const bodyParser = require('body-parser')
const teacherRouter = require('./teacher/router')

//routes
app.use(bodyParser.json())
app.use(teacherRouter)

const port = process.env.PORT
app.listen(port, () => console.log('Server up and running'))