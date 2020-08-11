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
    email: {
        type: Sequelize.TEXT,
        allowNull: false,
        required: true
    },
    phone: {
        type: Sequelize.BIGINT,
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
})

Students.belongsTo(Class, { onDelete: 'cascade' })
Class.hasMany(Students, { onDelete: 'cascade' })

module.exports = Students