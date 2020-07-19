const express = require('express')
const { Router } = express
const router = new Router()
const Students = require('./model')
const Class = require('../classes/model')
const Evaluation = require('../evaluation/model')

//add new student in a specific class
router.post('/classes/:classId/students', async (req, res) => {
    const existingClass = await Class.findByPk(req.params.classId)
    if (!existingClass) return res.status(400).send({
        message: `The class with id ${req.params.classId} is not found`
    })

    try {
        const newStudent = await Students.create({
            ...req.body,
            classId: req.params.classId
        })

        res.status(201).json(newStudent)
    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
})

//get all students(with their last color code) of a specific class
router.get('/classes/:classId/students', async (req, res) => {
    const existingClass = await Class.findByPk(req.params.classId)
    if (!existingClass) return res.status(400).send({
        message: 'The class is not found'
    })

    try {
        const students = await Students.findAll({
            where: {
                classId: req.params.classId
            },
            include: [
                {
                    model: Evaluation,
                    limit: 1,
                    order: [['date', 'DESC']]
                }
            ]
        })

        res.status(200).json({ students })
    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
})

//get a single student with all evaluations and his/her class details
router.get('/students/:studentId', async (req, res) => {
    try {
        const student = await Students.findOne({
            where: {
                id: req.params.studentId
            },
            include: [{ model: Evaluation }, { model: Class }],
            order: [
                [Evaluation, 'date', 'DESC']
            ]
        })

        if (!student) return res.status(404).send({ message: 'The student is not found ' })

        res.status(200).json({ student })
    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
})

//edit a student of a specific class
router.put('/students/:studentId', async (req, res) => {
    const existingStudent = await Students.findOne({
        where: {
            id: req.params.studentId
        }
    })
    if (!existingStudent) return res.status(400).send({
        message: 'The student is not found'
    })

    try {
        const updatedStudent = await existingStudent.update(req.body)
        res.status(200).json(updatedStudent)
    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
})

//delete a student of a specific class
router.delete('/students/:studentId', async (req, res) => {
    const student = await Students.findOne({
        where: {
            id: req.params.studentId
        }
    })

    if (!student) return res.status(400).send({ message: 'The student not found' })

    try {
        await Students.destroy({
            where: {
                id: req.params.studentId
            }
        })

        res.status(200).json({ id: parseInt(req.params.studentId) })
    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
})

//calculate percentage of last evaluations of all students - progress bar
router.get('/progressbar/:classId', async (req, res) => {
    const existingClass = await Class.findByPk(req.params.classId)
    if (!existingClass) return res.status(400).send({
        message: 'The class is not found'
    })
    try {
        const students = await Students.findAll({
            where: {
                classId: req.params.classId
            },
            include: [
                {
                    model: Evaluation,
                    limit: 1,
                    order: [['date', 'DESC']]
                }
            ]
        })

        const total = students.length //total students in thai class
        const studentsWithRed = students.filter(student => student.evaluations[0].colorcode === 'red').length
        const studentsWithYellow = students.filter(student => student.evaluations[0].colorcode === 'yellow').length
        const studentsWithGreen = students.filter(student => student.evaluations[0].colorcode === 'green').length

        res.status(200).send({
            redPercentage: ((studentsWithRed / total) * 100).toFixed(2),
            yellowPercentage: ((studentsWithYellow / total) * 100).toFixed(2),
            greenPercentage: ((studentsWithGreen / total) * 100).toFixed(2)
        })
    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
})

router.get('/algorithm/:classId', async (req, res) => {
    const existingClass = await Class.findByPk(req.params.classId)
    if (!existingClass) return res.status(400).send({
        message: 'The class is not found'
    })

    try {
        const students = await Students.findAll({
            where: {
                classId: req.params.classId
            },
            include: [
                {
                    model: Evaluation,
                    limit: 1,
                    order: [['date', 'DESC']]
                }
            ]
        })


        const randomNumber = parseFloat((Math.random() * 100).toFixed(2))
        let randomColor

        if (randomNumber >= 50) {
            randomColor = 'red'
        } else if (randomNumber < 50 && randomNumber >= 17) {
            randomColor = 'yellow'
        } else {
            randomColor = 'green'
        }

        const randomStudent = students.find(stud => stud.evaluations.find(eval => eval.colorcode === randomColor))

        res.json({
            randomNumber,
            randomStudent
        })
    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
})

module.exports = router