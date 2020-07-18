const Sequelize = require('sequelize')
const db = require('../db')
const Students = require('../students/model')

const Evaluation = db.define('evaluation', {
    colorcode: {
        type: Sequelize.ENUM,
        values: ['red', 'yellow', 'green']
    },
    date: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
    },
    remarks: {
        type: Sequelize.TEXT
    }

}, { timestamps: false })

Evaluation.belongsTo(Students)
Students.hasMany(Evaluation)

module.exports = Evaluation