const Sequelize = require('sequelize')
const databaseUrl = process.env.DATABASE_URL
const db = new Sequelize(databaseUrl)


// db
//     .sync({ force: true })
//     .then(() => {
//         console.log('Database connected')

//         const classes = [
//             { batchNo: 1, startDate: new Date("2019-01-01"), endDate: new Date("2019-02-01") },
//             { batchNo: 2, startDate: new Date("2019-02-01"), endDate: new Date("2019-03-01") },
//             { batchNo: 3, startDate: new Date("2019-03-01"), endDate: new Date("2019-04-01") },
//             { batchNo: 4, startDate: new Date("2019-04-01"), endDate: new Date("2019-05-01") },
//             { batchNo: 5, startDate: new Date("2019-05-01"), endDate: new Date("2019-06-01") }
//         ]

//         const classPromises = classes.map(batch => Class.create(batch))

//         return Promise.all(classPromises)
//     })
//     .catch(err => console.log(err))

module.exports = db