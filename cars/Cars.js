const Sequelize = require("sequelize")
const connection = require("../db/db.js")
const Car = connection.define ('Cars',{
   
    model:{
        type: Sequelize.STRING,
        allowNull:false  
    },
    brand:{
        type: Sequelize.STRING,
        allowNull: true

    },
    category: {
        type: Sequelize.STRING,
        allowNull:false
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull:false  
    },
    color: {
        type:Sequelize.STRING,
        allowNull:true,
        defaultValue: "N/D"
    },
    purchasePrice: {
        type: Sequelize.FLOAT,
        allowNull:false  
    },
    marketPrice: {
        type: Sequelize.FLOAT,
    },

    kilometers:{ 
        type: Sequelize.INTEGER
    },
    plate:{
        type: Sequelize.STRING
    },
    status:{
        type: Sequelize.STRING,
         defaultValue: 'ativo'
    },
})



connection.sync().then(()=>{
    console.log("Tabela Cars sincronizada com sucesso")
}).catch((err)=>{
    console.log(`erro ${err} ao criar tabela`)
})

module.exports= Car ;