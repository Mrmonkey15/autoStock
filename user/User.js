const Sequelize = require("sequelize")
const connection = require("../db/db.js")
const user = connection.define ('transactions',{
    username:{
        type: Sequelize.STRING,
        allowNull:false   
    },
    email:{
        type: Sequelize.STRING,
        allowNull:false},

    password:{
            type: Sequelize.STRING,
            allowNull:false },
    name:{
            type: Sequelize.TEXT,
            allowNull:false },
              
})
connection.sync().then(()=>{
    console.log("Tabela transaction criada com sucesso")
}).catch((err)=>{
    console.log(`erro ${err} ao criar tabela`)
})

module.exports= user ;