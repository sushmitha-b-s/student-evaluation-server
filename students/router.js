const express = require('express')
const { Router } = express
const router = new Router()
const Students = require('./model')
const Class = require('../classes/model')
const Evaluation = require('../evaluation/model')
const auth = require('../authMiddleware')

//add new student in a specific class
router.post('/classes/:classId/students', auth, async (req, res) => {
    const existingClass = await Class.findByPk(req.params.classId)
    if (!existingClass) return res.status(400).send({
        message: `The class with id ${req.params.classId} is not found`
    })

    try {
        const newStudent = await Students.create({
            ...req.body,
            classId: req.params.classId
        })

        const updatedStudent = await Students.findByPk(newStudent.id, {
            include: [
                {
                    model: Evaluation,
                    limit: 1,
                    order: [['date', 'DESC']]
                }
            ]
        })

        res.status(201).json(updatedStudent)
    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
})

//get all students(with their last color code) of a specific class
router.get('/classes/:classId/students', auth, async (req, res) => {
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
router.get('/students/:studentId', auth, async (req, res) => {
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
router.put('/students/:studentId', auth, async (req, res) => {
    const existingStudent = await Students.findOne({
        where: {
            id: req.params.studentId
        }
    })
    if (!existingStudent) return res.status(400).send({
        message: 'The student is not found'
    })

    try {
        const updateStudent = await existingStudent.update(req.body)

        const updatedStudent = await Students.findByPk(updateStudent.id, {
            include: [
                {
                    model: Evaluation,
                    limit: 1,
                    order: [['date', 'DESC']]
                }
            ]
        })
        res.status(200).json(updatedStudent)
    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
})

//delete a student of a specific class
router.delete('/students/:studentId', auth, async (req, res) => {
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

//calculate percentage of last evaluations of all students in a class - progress bar
router.get('/progressbar/:classId', auth, async (req, res) => {
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


        let none = 0
        let total = 0
        let redCount = 0
        let yellowCount = 0
        let greenCount = 0

        students.map(student => {
            if (student.evaluations.length === 0) {
                none++
            } else {
                const color = student.evaluations[0].colorcode

                if (color === 'red') {
                    redCount++
                    total++
                }

                if (color === 'yellow') {
                    yellowCount++
                    total++
                }

                if (color === 'green') {
                    greenCount++
                    total++
                }
            }
        })

        res.status(200).send({
            redPercentage: ((redCount / total) * 100).toFixed(2),
            yellowPercentage: ((yellowCount / total) * 100).toFixed(2),
            greenPercentage: ((greenCount / total) * 100).toFixed(2),
            total,
            none
        })
    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
})

//secret algorithm which picks a student randomly from a class based on their latest performance (colorcode).
//50% time - picks student who got 'red' as their latest colorcode.
//33% time - picks student who got 'yellow' as their latest colorcode.
//17% time - picks student who got 'green' as their latest colorcode.

router.get('/algorithm/:classId', auth, async (req, res) => {
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