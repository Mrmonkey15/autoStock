const express = require("express");
//middlewares
const Auth = require("../middlewares/Authenticate.js")
const AdminAuth = require("../middlewares/AdminAuth.js")
//router
const router = express.Router();
//models
const Brands = require("./Brands.js");
const Cars = require("./Cars.js")
const Transactions = require("./Transactions.js");
const { where } = require("sequelize");


// Inseri marcas no BD de marcas 




//lista de carros
router.get('/cars/list',Auth, async (req, res) => {
    try {
        const carList = await Cars.findAll({
            include: [
                {
                    model: Brands, 
                    attributes: ['name'] 
                }
            ]
        });
        res.render('cars/list', {carList, currentPage: 'carList'}); 
    } catch (error) {
        console.error("Erro ao buscar a lista de carros:", error);
        res.status(500).send("Erro ao carregar os carros");
    }
});

// Novo veículo

router.get('/cars/new',Auth, async (req, res) => {
    const brands = await Brands.findAll();
    res.render('./cars/new', {brands, currentPage: 'create'});
});

router.post('/api/createNewCar',Auth, async (req, res) => {
    try {
        const data = req.body;
        const newCar = await Cars.create({
            plate: data.plate,
            model: data.model,
            year: data.year,
            kilometers: data.kilometers,
            purchasePrice: data.purchasePrice,
            marketPrice: data.marketPrice,
            category: data.category,
            brandId: data.brandId,
        });
        const newTransaction = await Transactions.create({
            description: `Cadastro de novo veículo: ${newCar.plate}`,
            typeOfTrans: 'Entrada',
            carID: newCar.id,
            userID: req.session.user.id,
            responsible: req.session.user.name
        });
        res.status(200).json({
            message: 'Veículo e transação cadastrados com sucesso!',
            car: newCar,
            transaction: newTransaction
        });

    } catch (err) {
        console.error('Erro ao cadastrar veículo:', err);
        res.status(500).json({ message: 'Erro ao cadastrar veículo.' });
    }
});

router.delete('/car-delete/:carId', AdminAuth, async (req, res) => {
    const carID = req.params.carId;  // Captura o carId da URL
    try {
        // Executa a exclusão do carro
        const result = await Cars.destroy({
            where: { id: carID }  // Condição de exclusão
        });
            return res.json({ success: true });  // Retorna sucesso
    } catch (error) {
        // Caso haja erro na exclusão
        console.log("Erro ao tentar deletar veículo.", error);
        return res.status(500).json({ success: false, message: 'Erro ao tentar excluir o veículo.' });
    }
});

/*
router.post('/cars/edit/id', async (req, res) => {
    try {
        const carId = req.params.id; // Obtém o ID do carro da URL

        const car = await Cars.findOne({
            where: { id: carId }, // Corrigir a sintaxe aqui
            include: [Brands] // Incluindo o modelo Brands
        });
    
        // Verifica se o carro foi encontrado
        if (!car) {
            return res.status(404).send("Carro não encontrado");  // Caso o carro não exista
        }

        // Passa o carro e a marca para a view
        res.render('./cars/edit', { currentPage: "edit", car });

    } catch (erro) {
        console.log("Erro ao acessar rota: " + erro);
        res.status(500).send("Erro interno do servidor");
    }
});
*/ // fazer depois 


module.exports = router;
