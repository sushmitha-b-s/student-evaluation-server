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

//get all students of a specific class
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
router.put('/classes/:classId/students/:studentId', async (req, res) => {
    const existingStudent = await Students.findOne({
        where: {
            id: req.params.studentId,
            classId: req.params.classId
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
router.delete('/classes/:classId/students/:studentId', async (req, res) => {
    const student = await Students.findOne({
        where: {
            id: req.params.studentId,
            classId: req.params.classId
        }
    })

    if (!student) return res.status(400).send({ message: 'The student not found' })

    try {
        await Students.destroy({
            where: {
                id: req.params.studentId,
                classId: req.params.classId
            }
        })

        res.status(200).json({ id: parseInt(req.params.studentId) })
    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
})

module.exports = router