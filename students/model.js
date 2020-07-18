const Sequelize = require('sequelize')
const db = require('../db')
const Class = require('../classes/model')

const Students = db.define('student', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    profilePic: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    address: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    zipcode: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { timestamps: false })

Students.belongsTo(Class)
Class.hasMany(Students)

module.exports = Students