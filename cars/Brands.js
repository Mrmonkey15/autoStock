const Sequelize = require("sequelize");
const connection = require("../db/db.js");


const Brands = connection.define('Brands', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

connection.sync().then(() => {
  console.log("Tabela marcas criada com sucesso");
}).catch((err) => {
  console.log(`erro ${err} ao criar tabela marcas`);
});

module.exports = Brands;
