const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const db = require('./db')
const cors = require('cors')
const bodyParser = require('body-parser')
const teacherRouter = require('./teacher/router')

//middlewares
app.use(cors())
app.use(bodyParser.json())

//routes
app.use(teacherRouter)

const port = process.env.PORT
app.listen(port, () => console.log('Server up and running'))