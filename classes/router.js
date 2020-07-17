const express = require('express')
const { Router } = express
const router = new Router()
const Classes = require('./model')
const auth = require('../authMiddleware')
const { classValidation } = require('./validations')

router.post('/classes', auth, async (req, res) => {
    const { error } = await classValidation(req.body)
    if (error) return res.status(400).send({ message: error.details[0].message })

    try {
        const newClass = await Classes.create(req.body)

        res.status(201).json(newClass)
    } catch (err) {
        res.status(400).send({
            message: err.errors[0].message
        })
    }
})

router.get('/classes', auth, async (req, res) => {
    try {
        const classes = await Classes.findAll()

        res.status(200).json(classes)
    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
})

router.delete('/classes/:classId', auth, async (req, res) => {
    try {
        const deletedClass = await Classes.destroy({
            where: {
                id: req.params.classId
            }
        })

        if (!deletedClass) return res.status(404).json({
            message: `The class with id ${req.params.classId} is not found`
        })

        res.status(200).json({ id: parseInt(req.params.classId) })
    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
})

module.exports = router