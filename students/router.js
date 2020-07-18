const express = require('express')
const { Router } = express
const router = new Router()
const Students = require('./model')
const Class = require('../classes/model')

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
            message: err.errors[0].message
        })
    }
})

router.get('/classes/:classId/students', async (req, res) => {
    const existingClass = await Class.findByPk(req.params.classId)
    if (!existingClass) return res.status(400).send({
        message: 'The class is not found'
    })

    try {
        const students = await Students.findAll({
            where: {
                classId: req.params.classId
            }
        })

        res.status(200).json(students)
    } catch (err) {
        res.status(400).send({
            message: err.errors[0].message
        })
    }
})

router.put('/classes/:classId/students/:studentId', async (req, res) => {
    const existingStudent = await Students.findOne({
        where: {
            id: req.params.studentId,
            classId: req.params.classId
        }
    })
    if (!existingStudent) return res.status(400).send({
        message: `The student is not found`
    })

    try {
        const updatedStudent = await existingStudent.update(req.body)
        res.status(200).json(updatedStudent)
    } catch {
        res.status(400).send({
            message: err.errors[0].message
        })
    }
})

module.exports = router