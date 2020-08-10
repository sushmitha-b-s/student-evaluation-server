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

//dummy
const Teacher = require('./teacher/model')
const Class = require('./classes/model')
const Student = require('./students/model')
const Evaluation = require('./evaluation/model')

//middlewares
app.use(cors())
app.use(bodyParser.json())

//route middlewares
app.use(teacherRouter)
app.use(classRouter)
app.use(studentRouter)
app.use(evaluationRouter)

const port = process.env.PORT

db
    .sync({ force: true })
    .then(() => {
        console.log('Database connected')

        const teachers = [
            { fullname: 'sushmitha bs', email: 'sush@gmail.com', password: 'sushprachu' }
        ]

        const teacherPromises = teachers.map(teac => Teacher.create(teac))

        return Promise.all(teacherPromises)
    })
    .then(() => {
        const classes = [
            { batchNo: 1, startDate: new Date("2020-01-01"), endDate: new Date("2020-02-01") },
            { batchNo: 2, startDate: new Date("2020-02-01"), endDate: new Date("2020-03-01") },
            { batchNo: 3, startDate: new Date("2020-03-01"), endDate: new Date("2020-04-01") },
            { batchNo: 4, startDate: new Date("2020-04-01"), endDate: new Date("2020-05-01") }
        ]

        const classPromises = classes.map(batch => Class.create(batch))

        return Promise.all(classPromises)
    })
    .then(() => {
        const students = [
            { name: 'Harry Potter', profilePic: 'https://en.hdhod.com/photo/art/grande/9638751-15511395.jpg?v=1465387673', email: 'harrypotter@gmail.com', phone: 5478125874, address: 'Hogwarts 1', zipcode: '5247 KT', city: 'DisneyLand', country: 'England', classId: 1 },
            { name: 'Hermione Granger', profilePic: 'https://www.childstarlets.com/lobby/bios/portraits/emma_watson13.jpg', email: 'emma@gmail.com', phone: 5487478549, address: 'Hogwarts 2', zipcode: '5247 KT', city: 'DisneyLand', country: 'England', classId: 1 },
            { name: 'Ron weasley', profilePic: 'https://i.insider.com/568d4264dd0895a83d8b45eb?width=1048&format=jpeg', email: 'ron@gmail.com', phone: 5478125874, address: 'Hogwarts 3', zipcode: '5247 KT', city: 'DisneyLand', country: 'England', classId: 1 },
            { name: 'Voldemort', profilePic: 'https://i.pinimg.com/originals/47/22/aa/4722aaee1322cd6adc02b4f2fb250075.jpg', email: 'voldemort@gmail.com', phone: 5478125874, address: 'Hogwarts 4', zipcode: '5250 KT', city: 'DisneyLand', country: 'England', classId: 1 },
            { name: 'Mastese Fields', profilePic: 'https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=753&q=80', email: 'mastese@gmail.com', phone: 5478125874, address: 'Frederik Van Eedenplein 1', zipcode: '5247 KT', city: 'Eindhoven', country: 'Nederlands', classId: 2 },
            { name: 'Yingchou Han', profilePic: 'https://images.unsplash.com/photo-1492462543947-040389c4a66c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80', email: 'yingchou@gmail.com', phone: 5478125874, address: 'Frederk Van Eedenplein 2', zipcode: '5247 KT', city: 'Eindhoven', country: 'Nederlands', classId: 2 },
            { name: 'Wes Hicks', profilePic: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80', email: 'wes@gmail.com', phone: 5478125874, address: 'Frederk Van Eedenplein 3', zipcode: '5247 KT', city: 'Eindhoven', country: 'Nederlands', classId: 2 },
            { name: 'Per Loov', profilePic: 'https://images.unsplash.com/photo-1546514714-bbedf0abd907?ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80', email: 'perloov@gmail.com', phone: 5478125874, address: 'Torenallee 30-10', zipcode: '5617 BD', city: 'Eindhoven', country: 'Nederlands', classId: 2 },
            { name: 'Luke Peters', profilePic: 'https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80', email: 'lukepeters@gmail.com', phone: 5478125874, address: 'Bergland 12-43', zipcode: '5247 KT', city: 'Best', country: 'Nederlands', classId: 3 },
            { name: 'Siora Phoenix', profilePic: 'https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=761&q=80', email: 'soera@gmail.com', phone: 5478125874, address: 'Harmelen 23', zipcode: '56547 SD', city: 'Utrecht', country: 'Nederlands', classId: 3 },
            { name: 'Victoria Priessnitz', profilePic: 'https://images.unsplash.com/photo-1580152102961-676c176007c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80', email: 'victoria@gmail.com', phone: 5478125874, address: 'Harmelen 24', zipcode: '5621 JK', city: 'Eindhoven', country: 'Nederlands', classId: 4 },
            { name: 'Michael Dam', profilePic: 'https://images.unsplash.com/photo-1517842536804-bf6629e2c291?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80', email: 'michaeldam@gmail.com', phone: 5478125874, address: 'Harmelen 25', zipcode: '5623 JI', city: 'Eindhoven', country: 'Nederlands', classId: 4 },
            { name: 'Jody Hong', profilePic: 'https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80', email: 'jodyhong@gmail.com', phone: 5478125874, address: 'Van Gogh Museum 21', zipcode: '5897 LA', city: 'Amsterdam', country: 'Nederlands', classId: 4 },
            { name: 'Sean Kong', profilePic: 'https://images.unsplash.com/photo-1514355315815-2b64b0216b14?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80', email: 'seankong@gmail.com', phone: 5478125874, address: 'Van Gogh Museum 22', zipcode: '5898 LA', city: 'Amsterdam', country: 'Nederlands', classId: 4 },
            { name: 'Clay Banks', profilePic: 'https://images.unsplash.com/photo-1494809610410-160faaed4de0?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80', email: 'clay@gmail.com', phone: 5478125874, address: 'Van Gogh Museum 23', zipcode: '5899 LA', city: 'Amsterdam', country: 'Nederlands', classId: 4 },
        ]

        const studentPromises = students.map(stud => Student.create(stud))

        return Promise.all(studentPromises)
    })
    .then(() => {
        const evaluations = [
            { colorcode: 'green', date: new Date("2020-01-05"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 1 },
            { colorcode: 'yellow', date: new Date("2020-01-06"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 1 },
            { colorcode: 'yellow', date: new Date("2020-01-07"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 1 },
            { colorcode: 'green', date: new Date("2020-01-08"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 2 },
            { colorcode: 'green', date: new Date("2020-01-09"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 2 },
            { colorcode: 'green', date: new Date("2020-01-10"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 2 },
            { colorcode: 'green', date: new Date("2020-01-22"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 3 },
            { colorcode: 'green', date: new Date("2020-01-14"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 3 },
            { colorcode: 'yellow', date: new Date("2020-01-25"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 3 },
            { colorcode: 'red', date: new Date("2020-01-18"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 4 },
            { colorcode: 'red', date: new Date("2020-01-19"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 4 },
            { colorcode: 'green', date: new Date("2020-01-17"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 5 },
            { colorcode: 'red', date: new Date("2020-01-01"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 5 },
            { colorcode: 'green', date: new Date("2020-01-02"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 6 },
            { colorcode: 'yellow', date: new Date("2020-01-22"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 6 },
            { colorcode: 'green', date: new Date("2020-01-30"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 7 },
            { colorcode: 'red', date: new Date("2020-01-04"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 7 },
            { colorcode: 'green', date: new Date("2020-01-05"), remarks: 'LLorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 7 },
            { colorcode: 'yellow', date: new Date("2020-01-06"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 8 },
            { colorcode: 'green', date: new Date("2020-01-07"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 8 },
            { colorcode: 'red', date: new Date("2020-01-20"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 9 },
            { colorcode: 'green', date: new Date("2020-01-21"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 9 },
            { colorcode: 'red', date: new Date("2020-01-26"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 10 },
            { colorcode: 'green', date: new Date("2020-01-24"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 11 },
            { colorcode: 'red', date: new Date("2020-01-27"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 12 },
            { colorcode: 'green', date: new Date("2020-01-06"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 13 },
            { colorcode: 'yellow', date: new Date("2020-01-02"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 14 },
            { colorcode: 'red', date: new Date("2020-01-06"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 1 },
            { colorcode: 'green', date: new Date("2020-01-11"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 4 },
            { colorcode: 'red', date: new Date("2020-01-12"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 7 },
            { colorcode: 'green', date: new Date("2020-01-13"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 14 },
            { colorcode: 'yellow', date: new Date("2020-01-14"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 12 },
            { colorcode: 'yellow', date: new Date("2020-01-14"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 15 },
            { colorcode: 'green', date: new Date("2020-01-24"), remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat expedita sint! Cupiditate quidem vitae porro, dignissimos neque expedita recusandae.', studentId: 15 },
        ]

        const evaluationPromises = evaluations.map(evaluation => Evaluation.create(evaluation))

        return Promise.all(evaluationPromises)
    })
    .catch(err => console.log(err))

app.listen(port, () => console.log('Server up and running'))