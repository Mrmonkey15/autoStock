const Sequelize = require("sequelize")
const connection = require("../db/db.js")
const Brands = require("./Brands.js")
const Car = connection.define ('Cars',{
   
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
    },
    plate:{
        type: Sequelize.STRING
    },
    status:{
        type: Sequelize.STRING,
         defaultValue: 'ativo'
    }
})

Brands.hasMany(Car, {
    foreignKey: 'brandId', // Chave estrangeira no modelo Car
});
Car.belongsTo(Brands, { foreignKey: 'brandId' });

connection.sync().then(()=>{
    console.log("Tabela Cars sincronizada com sucesso")
}).catch((err)=>{
    console.log(`erro ${err} ao criar tabela`)
})

module.exports= Car ;