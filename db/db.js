const { Sequelize } = require('sequelize')
const connection = new Sequelize('autoStock','root','Piloto307#', {
    host:'localhost',
    dialect:'mysql'
})

connection.sync()

module.exports= connection;