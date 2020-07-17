const express = require('express')
const { Router } = express
const router = new Router()
const Teacher = require('./model')
const { registerValidation, loginValidation } = require('./validations')
const bcrypt = require('bcrypt')

router.post('/register', async (req, res, next) => {
    const { error } = await registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const emailExists = await Teacher.findOne({
        where: {
            email: req.body.email
        }
    })

    if (emailExists) return res.status(400).send('The email already exists')

    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt);

    try {
        const { fullname, email } = req.body
        const newTeacher = await Teacher.create({
            fullname,
            email,
            password: hashedPassword
        })

        res.status(201).send(newTeacher)
    } catch (err) {
        next(err)
    }

})

router.post('/login', async (req, res, next) => {
    const { error } = await loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const teacher = await Teacher.findOne({
        where: {
            email: req.body.email
        }
    })

    if (!teacher) return res.status(400).send('Invalid email')

    const verifyPassword = await bcrypt.compare(req.body.password, teacher.password)

    if (!verifyPassword) return res.status(400).send('Invalid password')

    try {
        res.send('success')
    } catch (err) {
        next(err)
    }
})

module.exports = router