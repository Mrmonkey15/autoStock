const express = require("express");
const router = express.Router();
const Brands = require("./Brands.js");
const DbManipulator = require("../db/DBManipulator.js");
const Cars = require("./Cars.js")


router.get('/', (req, res) => {
    res.send("hello world");
});

router.get('/cars/new', async (req, res) => {
    const brands = await Brands.findAll();
    res.render('./cars/new', { brands });
});

router.post('/api/createNewCar', async (req, res) => {
    try {
        // Instanciando o manipulador de dados do banco de dados
        const CarManipulator = new DbManipulator({ Model: Cars });
        const data = req.body
        // Chamando o manipulado para inserir dados no manco de dados
        await CarManipulator.insert(data);
        // Retornando uma resposta de sucesso
        res.status(200).json({  message: 'Veículo cadastrado com sucesso!' }); // Melhorar esta parte no futuro 
    } catch (err) {
        console.error('Erro ao cadastrar veículo:', err);
        res.status(500).json({ message: 'Erro ao cadastrar veículo.' });
    }
});


module.exports = router;
