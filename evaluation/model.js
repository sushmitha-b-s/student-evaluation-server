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

})

Evaluation.belongsTo(Students, { onDelete: 'cascade' })
Students.hasMany(Evaluation, { onDelete: 'cascade' })

module.exports = Evaluation