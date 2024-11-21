const Sequelize = require("sequelize")
const connection = require("../db/db.js")
const User = connection.define ('users',{
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
    console.log("Tabela user sincronizada com sucesso")
}).catch((err)=>{
    console.log(`erro ${err} ao criar tabela`)
})

module.exports= User ;