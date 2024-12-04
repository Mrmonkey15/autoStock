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
    responsible: {
        type: Sequelize.STRING,
        allowNull:true,
    }
});

// Relacionamentos

Transactions.belongsTo(Cars, { 
    foreignKey: "carID", 
    onDelete: 'CASCADE',  // Exclui as transações associadas quando um carro é excluído
    onUpdate: 'CASCADE'   // Atualiza as transações se o id do carro mudar
});
Transactions.belongsTo(User, { 
    foreignKey: "userID", 
    onDelete: 'CASCADE',  // Exclui as transações associadas quando um usuário é excluído
    onUpdate: 'CASCADE'   // Atualiza as transações se o id do usuário mudar
});

// Sync com o banco de dados
connection.sync({alter:true}) // Apenas para desenvolvimento; remova em produção
    .then(() => {
        console.log("Tabela transactions sincronizado com sucesso");
    })
    .catch((err) => {
        console.log(`Erro ao criar tabela: ${err}`);
    });

module.exports = Transactions;
