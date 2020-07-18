const express = require('express')
const { Router } = express
const router = new Router()
const Evaluation = require('./model')
const Student = require('../students/model')

//post an evaluation for a specific student
router.post('/students/:studentId/evaluations', async (req, res) => {
    const existingStudent = await Student.findByPk(req.params.studentId)

    if (!existingStudent) return res.status(400).send({
        message: `The student with id ${req.params.studentId} is not found`
    })

    try {
        const newEvaluation = await Evaluation.create({
            ...req.body,
            studentId: req.params.studentId
        })

        res.status(201).json(newEvaluation)
    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
})

//edit an evaluation for a specific student
router.put('/evaluations/:evaluationId', async (req, res) => {
    const existingEvaluation = await Evaluation.findOne({
        where: {
            id: req.params.evaluationId
            // studentId: req.params.studentId
        }
    })
    if (!existingEvaluation) return res.status(400).send({ message: 'The evaluation not found' })

    try {
        const updatedEvaluation = await existingEvaluation.update(req.body)
        res.status(200).json(updatedEvaluation)
    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
})

//delete an evaluation of a specific student
router.delete('/evaluations/:evaluationId', async (req, res) => {
    const evaluation = await Evaluation.findOne({
        where: {
            id: req.params.evaluationId
            // studentId: req.params.studentId
        }
    })

    if (!evaluation) return res.status(400).send({ message: 'The evaluation not found' })
    try {
        await Evaluation.destroy({
            where: {
                id: req.params.evaluationId
                // studentId: req.params.studentId
            }
        })

        res.status(200).json({ id: parseInt(req.params.evaluationId) })
    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
})

module.exports = router
