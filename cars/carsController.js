const express = require("express");
const router = express.Router();
const Brands = require("./Brands.js");
const CarClass = require("../classes/CarClass.js");

router.get('/', (req, res) => {
    res.send("hello world");
});

router.get('/cars/new', async (req, res) => {
    const brands = await Brands.findAll();
    res.render('./cars/new', { brands });
});

router.post('/api/createNewCar', async (req, res) => {
    try {
        // Instanciando a classe CarClass com os dados recebidos no corpo da requisição
        const carData = new CarClass(req.body);

        // Chamando o método create() para inserir os dados no banco
        await carData.create();

        // Retornando uma resposta de sucesso
        res.status(200).json({  message: 'Veículo cadastrado com sucesso!' });
    } catch (err) {
        console.error('Erro ao cadastrar veículo:', err);
        res.status(500).json({ message: 'Erro ao cadastrar veículo.' });
    }
});

module.exports = router;
