const Sequelize = require('sequelize')
const databaseUrl = process.env.DATABASE_URL
const db = new Sequelize(databaseUrl)

db
    .sync({ force: true })
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err))

module.exports = db