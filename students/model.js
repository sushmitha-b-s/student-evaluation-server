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
        allowNull: false,
        required: true
    },
    address: {
        type: Sequelize.TEXT,
        allowNull: false,
        required: true
    },
    zipcode: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    }
}, { timestamps: false })

Students.belongsTo(Class)
Class.hasMany(Students)

module.exports = Students