const express = require("express");
const router = express.Router();
const Brands = require("./Brands.js");
const DbManipulator = require("../db/DBManipulator.js");
const Cars = require("./Cars.js")
const Transactions = require("./Transactions.js")


router.get('/cars/list', async (req, res) => {
   const carList =   await Cars.findAll({
        include: [
            {
                model: Brands, // Inclui o modelo Brands
                attributes: ['name'] 
                
            }
        ]
    })
    res.render('./cars/list',{carList});

});

router.get('/cars/new', async (req, res) => {
    const brands = await Brands.findAll();
    res.render('./cars/new', { brands });
});
router.post('/api/createNewCar', async (req, res) => {
    try {
        const data = req.body;
        
        // Cria o novo carro
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

        // Cria a transação associada ao novo carro
        const newTransaction = await Transactions.create({
            description: `Cadastro de novo veículo: ${newCar.plate}`,
            typeOfTrans: 'Entrada',
            carID: newCar.id,
            userID: undefined // Supondo que você tem um usuário autenticado
        });
        res.status(200).json({
            message: 'Veículo e transação cadastrados com sucesso!',
            car: newCar,
            transaction: newTransaction,
        });

    } catch (err) {
        console.error('Erro ao cadastrar veículo:', err);
        res.status(500).json({ message: 'Erro ao cadastrar veículo.' });
    }
});
router.delete('/car-delete/:carId', async (req, res) => {
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



module.exports = router;
