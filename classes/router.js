const express = require('express')
const { Router } = express
const router = new Router()
const Classes = require('./model')
const auth = require('../authMiddleware')

router.post('/classes', auth, async (req, res) => {
    try {
        const newClass = await Classes.create(req.body)

        res.status(201).json(newClass)
    } catch (err) {
        res.status(400).send({
            message: err
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
    const classToDelete = await Classes.findOne({
        where: {
            id: req.params.classId
        }
    })

    if (!classToDelete) return res.status(400).send({ message: 'The class not found' })

    try {
        await Classes.destroy({
            where: {
                id: req.params.classId
            }
        })

        res.status(200).json({ id: parseInt(req.params.classId) })
    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
})

module.exports = router