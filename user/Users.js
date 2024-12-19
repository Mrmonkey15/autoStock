const Sequelize = require("sequelize")
const connection = require("../db/db.js")
const { defaultValueSchemable } = require("sequelize/lib/utils")
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
    role:{
        type: Sequelize.TEXT,
        defaultValue:"funcionário"}
              
})
connection.sync().then(()=>{
    console.log("Tabela user sincronizada com sucesso")
}).catch((err)=>{
    console.log(`erro ${err} ao criar tabela`)
})

module.exports= User ;