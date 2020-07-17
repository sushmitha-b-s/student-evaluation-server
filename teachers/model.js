const Sequelize = require('sequelize')
const db = require('../db')

const Teachers = db.define('teacher', {
    fullname: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
})

module.exports = Teachers