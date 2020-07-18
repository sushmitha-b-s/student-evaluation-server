const Sequelize = require('sequelize')
const db = require('../db')

const Classes = db.define('class', {
    batchNo: {
        type: Sequelize.INTEGER
    },
    startDate: {
        type: Sequelize.STRING //DD-MM-YYYY
    },
    endDate: {
        type: Sequelize.STRING //DD-MM-YYYY
    }
}, { timestamps: false })

module.exports = Classes