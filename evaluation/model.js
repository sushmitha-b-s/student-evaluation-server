const Sequelize = require('sequelize')
const db = require('../db')
const Students = require('../students/model')

const Evaluation = db.define('evaluation', {
    colorcode: {
        type: Sequelize.ENUM,
        values: ['red', 'yellow', 'green'],
        allowNull: false,
        required: true
    },
    date: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
        allowNull: false,
        required: true
    },
    remarks: {
        type: Sequelize.TEXT,
        allowNull: false,
        required: true
    }

})

Evaluation.belongsTo(Students, { onDelete: 'cascade' })
Students.hasMany(Evaluation, { onDelete: 'cascade' })

module.exports = Evaluation