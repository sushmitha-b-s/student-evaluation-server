const Sequelize = require('sequelize')
const db = require('../db')

const Classes = db.define('class', {
    batchNo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true
    },
    startDate: {
        type: Sequelize.STRING, //DD-MM-YYYY
        allowNull: false,
        required: true
    },
    endDate: {
        type: Sequelize.STRING, //DD-MM-YYYY
        allowNull: false,
        required: true
    }
})

module.exports = Classes