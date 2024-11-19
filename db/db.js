const { Sequelize } = require('sequelize')
const connection = new Sequelize('autoStock','root','Piloto307#', {
    host:'localhost',
    dialect:'mysql'
})

module.exports= connection;