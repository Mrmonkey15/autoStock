const Sequelize = require("sequelize")
const connection = require("../db/db.js")
const car = connection.define ('Car',{
    make:{
        type: Sequelize.STRING,
        allowNull:false   
    },
    model:{
        type: Sequelize.STRING,
        allowNull:false  
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull:false  
    },
    purchasePrice: {
        type: Sequelize.FLOAT,
        allowNull:false  
    },
    marketPrice: {
        type: Sequelize.FLOAT,
    },
    category: {
        type: Sequelize.STRING,
        allowNull:false
    },
    kilometers:{ 
        type: Sequelize.INTEGER
    }

})

connection.sync().then(()=>{
    console.log("Tabela Cars sincronizada com sucesso")
}).catch((err)=>{
    console.log(`erro ${err} ao criar tabela`)
})

module.exports= car ;