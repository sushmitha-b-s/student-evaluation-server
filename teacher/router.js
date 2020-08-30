const express = require("express");
const { Router } = express;
const router = new Router();
const Teacher = require("./model");
const { registerValidation, loginValidation } = require("./validations");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { error } = await registerValidation(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const emailExists = await Teacher.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (emailExists)
    return res.status(400).json({ error: "The email already exists." });

  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(req.body.password, salt);

  try {
    const { fullname, email } = req.body;
    const newTeacher = await Teacher.create({
      fullname,
      email,
      password: hashedPassword,
    });

    res.status(201).send(newTeacher);
  } catch (err) {
    res.status(400).send({
      error: err,
    });
  }
});

router.post("/login", async (req, res) => {
  const { error } = await loginValidation(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const teacher = await Teacher.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!teacher)
    return res.status(400).send({ error: "Invalid email or password." });

  const verifyPassword = await bcrypt.compare(
    req.body.password,
    teacher.password
  );

  if (!verifyPassword)
    return res.status(400).send({ error: "Invalid email or password." });

  try {
    const { id, fullname, email } = teacher;
    const token = await jwt.sign(
      { id, fullname, email },
      process.env.TOKEN_SECRET
    );

    res.header("auth-token", token).send({
      id,
      fullname,
      email,
      token,
    });
  } catch (err) {
    res.status(400).send({
      error: err,
    });
  }
});

router.get("/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.findAll();

    res.status(200).send({ teachers });
  } catch (err) {
    res.status(400).send({
      message: err,
    });
  }
});

module.exports = router;
