const express = require("express");
//middlewares
const Auth = require("../middlewares/Authenticate.js")
const AdminAuth = require("../middlewares/AdminAuth.js")
//router
const router = express.Router();
//models
const Cars = require("./Cars.js")
const Transactions = require("./Transactions.js");
const { where } = require("sequelize");
const Brands = require("./BrandsList.js")


// dashboard

router.get("/dashboard", async (req, res) => {
    try {
        let carList = await Cars.findAll();
        res.render("dashboard",{currentPage:'dashboard', carList})
    } catch (err) {
        res.json({ error: err.message }); 
    }
});


router.post('/car/page/:id', async (req,res) => {
    try{
        const id = req.params.id;
        const carInfo = await Cars.findByPk(id);
        if(!carInfo){
            res.json({msg:`veículo não encontrado`})
        }
        
        res.render('cars/car',{carInfo, currentPage:"Page"})
    }catch(erro){
        console.log(erro)
    }

    
})




//lista de carros
router.get('/cars/list',Auth, async (req, res) => {
    try {
        const carList = await Cars.findAll();
        res.render('cars/list', {Brands,carList, currentPage: 'carList'}); 
    } catch (error) {
        console.error("Erro ao buscar a lista de carros:", error);
        res.status(500).send("Erro ao carregar os carros");
    }
});

// Novo veículo

router.get('/cars/new',Auth, async (req, res) => {
    
    res.render('./cars/new', { Brands, currentPage: 'create'});
});

router.post('/api/createNewCar',Auth, async (req, res) => {
    try {
        const data = req.body;
        const newCar = await Cars.create({
            plate: data.plate,
            brand: data.brand,
            model: data.model,
            year: data.year,
            kilometers: data.kilometers,
            purchasePrice: data.purchasePrice,
            marketPrice: data.marketPrice,
            category: data.category,
            color: data.color
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

// renderiza a edição 
router.get('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;  // Agora pegamos o ID da URL

        if (!id) {
            return res.status(400).send("ID do carro não fornecido");
        }

        // Buscando o carro no banco de dados usando o ID
        const car = await Cars.findByPk(id);

        if (!car) {
            return res.status(404).send("Carro não encontrado");
        }

        // Renderizando a página de edição com as informações do carro
        res.render('./cars/edit', { currentPage: "edit", car,Brands });

    } catch (erro) {
        console.log("Erro ao acessar rota: " + erro);
        res.status(500).send("Erro interno do servidor");
    }
});

router.put("/cars/edit/updated/:id", async (req, res) => {
    try {
        const car = req.body; 
        const id = req.params.id;

        // Atualizando o carro no banco de dados
        const [updatedCount] = await Cars.update(
            {
                model: car.model,
                year: car.year,
                color: car.color,
                status: car.status,
                brand: car.brand,
                plate: car.plate,
                purchasePrice: car.purchasePrice,
                marketPrice: car.marketPrice,
                category: car.category,
                kilometers: car.kilometers,
            },
            {
                where: { id: id }
            }
        );

        // Verificando se o carro foi atualizado
        if (updatedCount === 0) {
            return res.status(404).json({ msg: `Veículo com ID ${id} não encontrado` });
        }

        // Buscando os dados do carro atualizado
        const updatedCar = await Cars.findByPk(id);
        if (!updatedCar) {
            return res.status(404).json({ msg: `Veículo com ID ${id} não encontrado` });
        }

        // Criando uma transação para o carro atualizado
        const newTransaction = await Transactions.create({
            description: `Modificação realizada veículo placa: ${updatedCar.plate}`,
            typeOfTrans: 'modificacao',
            carID: updatedCar.id,
            userID: req.session.user.id,
            responsible: req.session.user.name
        });

        // Retornando os dados do carro atualizado e a transação criada
        res.status(200).json({
            msg: `Veículo ${updatedCar.plate} atualizado com sucesso`,
            updatedCar,
            transaction: newTransaction
        });

    } catch (error) {
        // Tratando erros do servidor
        console.error("Erro ao tentar atualizar veículo:", error);
        res.status(500).json({ msg: `Erro interno ao atualizar veículo: ${error.message}` });
    }
});



module.exports = router;
