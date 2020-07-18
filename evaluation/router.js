const express = require('express')
const { Router } = express
const router = new Router()
const Evaluation = require('./model')
const Student = require('../students/model')

//post a remark (receive studentId, and post remark)
//get a student with his details and his/her remarks (single or multiple)
//delete a remark (find student based on his id, and delete remark by its id.)
//edit a remark (find remark using student id and remark id, edit it and send back the remark.)

//post a remark for a specific student
router.post('/students/:studentId/evaluations', async (req, res) => {
    const existingStudent = await Student.findByPk(req.params.studentId)

    if (!existingStudent) return res.status(400).send({
        message: `The student with id ${req.params.studentId} is not found`
    })

    try {
        const newRemark = await Evaluation.create({
            ...req.body,
            studentId: req.params.studentId
        })

        res.status(201).json(newRemark)
    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
})

router.put('/students/:studentId/evaluations/:evaluationId', async (req, res) => {
    const existingEvaluation = await Evaluation.findOne({
        where: {
            id: req.params.evaluationId,
            studentId: req.params.studentId
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

router.delete('/students/:studentId/evaluations/:evaluationId', async (req, res) => {
    const evaluation = await Evaluation.findOne({
        where: {
            id: req.params.evaluationId,
            studentId: req.params.studentId
        }
    })

    if (!evaluation) return res.status(400).send({ message: 'The evaluation not found' })
    try {
        await Evaluation.destroy({
            where: {
                id: req.params.evaluationId,
                studentId: req.params.studentId
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