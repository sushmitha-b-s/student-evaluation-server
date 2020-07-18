const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const db = require('./db')
const cors = require('cors')
const bodyParser = require('body-parser')

//routes
const teacherRouter = require('./teacher/router')
const classRouter = require('./classes/router')
const studentRouter = require('./students/router')

//middlewares
app.use(cors())
app.use(bodyParser.json())

//route middlewares
app.use(teacherRouter)
app.use(classRouter)
app.use(studentRouter)

const port = process.env.PORT
app.listen(port, () => console.log('Server up and running'))