const Sequelize = require("sequelize");
const connection = require("../db/db.js");
const Cars = require("./Cars.js");
const User = require("../user/Users.js");

const Transactions = connection.define("transactions", {
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    typeOfTrans: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

// Relacionamentos

Transactions.belongsTo(Cars, { foreignKey: "carID" }); // Transação pertence a um carro
Transactions.belongsTo(User, { foreignKey: "userID" }); // Transação pertence a um usuário

// Sync com o banco de dados
/*connection.sync() // Apenas para desenvolvimento; remova em produção
    .then(() => {
        console.log("Tabela transactions sincronizado com sucesso");
    })
    .catch((err) => {
        console.log(`Erro ao criar tabela: ${err}`);
    });*/

module.exports = Transactions;
