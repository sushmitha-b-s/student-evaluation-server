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
const evaluationRouter = require('./evaluation/router')

//middlewares
app.use(cors())
app.use(bodyParser.json())

//route middlewares
app.use(teacherRouter)
app.use(classRouter)
app.use(studentRouter)
app.use(evaluationRouter)

const port = process.env.PORT || 4000

app.listen(port, () => console.log('Server up and running'))