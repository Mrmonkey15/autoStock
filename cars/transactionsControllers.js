const express = require("express");
//middlewares
const Auth = require("../middlewares/Authenticate.js")
const AdminAuth = require("../middlewares/AdminAuth.js")
const router = express.Router();
//models
const Brands = require("./Brands.js");
const Cars = require("./Cars.js")
const Users =require("../user/Users.js")
const Transactions = require("./Transactions.js")

router.get("/admin/transactions",AdminAuth, async (req, res) => {
    try {
        const trans = await Transactions.findAll({
            include: [
                {
                    model: Cars,
                    attributes: ['id', 'model','plate','purchasePrice'] // Certifique-se de que os atributos são os corretos de Cars
                },
                {
                    model: Users, 
                    attributes: ['id', 'name', 'email'] // Certifique-se de que os atributos são os corretos de Users
                }
            ]
        });
        console.log(trans)
        res.render("./admin/transactions", { currentPage: 'transactions', trans });
    } catch (erro) {
        res.json({ msg: `Erro ao obter lista de transação ${erro}` });
    }
});




module.exports = router;
