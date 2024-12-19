const express = require("express");
const router = express.Router();
const Users = require("./Users");
const bcrypt = require('bcrypt');
const User = require("./Users");
const Cars = require("../cars/Cars")
// Painel do adm 
router.get("/admin/users/list", async(req,res)=>{
    const UserList = await Users.findAll()
    res.render("admin/userList", {UserList, currentPage: 'admin'})
})

// Crud usuário

router.get("/admin/create-user",(req,res)=>{
    res.render('admin/create', { currentPage:"create" })
})

router.post("/api/register/user", async (req, res) => {
    try {
        const name = req.body.name;
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const role = req.body.role;

        // Verificar se o e-mail já está cadastrado
        const emailSearch = await Users.findOne({
            where: { email }
        });

        if (!emailSearch) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const response = await Users.create({
                name: name,
                username: username,
                email: email,
                password: hash,
                role: role
            });

            res.render("admin/create", { successMessage: "Usuário cadastrado com sucesso!", currentPage:'create' });
        } else {
            // E-mail já está cadastrado
            res.render("admin/create", { errorMessage: "E-mail já cadastrado!" });
        }
    } catch (err) {
        console.log("Erro ao cadastrar usuário", err);
        res.render("admin/create", { errorMessage: "Erro ao cadastrar usuário. Tente novamente." });
    }
});

router.post('/admin/edit/:id', async (req,res) => {
    
    try {
        const id = req.params.id;
        const user = await Users.findByPk(id)
        console.log(user)
        res.render('admin/edit', {user,currentPage:'admin'})    
    } catch (error) {
        console.log('erro no servidor'+ error)
    }
})



router.put('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const userUpdated = req.body;

        // Verifica se o usuário existe no banco de dados
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Atualiza o usuário com os dados fornecidos
        await User.update(userUpdated, {
            where: { id: id },
        });

        // Retorna uma resposta de sucesso
        res.status(200).json({
            message: 'Usuário atualizado com sucesso',
            data: userUpdated,
        });
    } catch (error) {
        console.error('Erro ao atualizar o usuário:', error);

        // Retorna uma resposta de erro
        res.status(500).json({
            message: 'Erro ao atualizar o usuário',
            error: error.message,
        });
    }
});








router.delete('/user-delete/:userId', async (req, res) => {
    const userId = req.params.userId;  // Captura o userId da URL
    try {
        // Executa a exclusão do usuário
        const result = await Users.destroy({
            where: { id: userId }  // Condição de exclusão
        });
        if (result) {
            return res.json({ success: true });  // Retorna sucesso
        } else {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
        }
    } catch (error) {
        // Caso haja erro na exclusão
        console.log("Erro ao tentar deletar usuário:", error);
        return res.status(500).json({ success: false, message: 'Erro ao tentar excluir o usuário.' });
    }
});


  
  














module.exports = router