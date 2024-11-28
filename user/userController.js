const express = require("express");
const router = express.Router();
const Users = require("./Users");
const bcrypt = require('bcrypt')

router.get("/admin/create-user",(req,res)=>{
    res.render('admin/create')
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

            res.render("admin/create", { successMessage: "Usuário cadastrado com sucesso!" });
        } else {
            // E-mail já está cadastrado
            res.render("admin/create", { errorMessage: "E-mail já cadastrado!" });
        }
    } catch (err) {
        console.log("Erro ao cadastrar usuário", err);
        res.render("admin/create", { errorMessage: "Erro ao cadastrar usuário. Tente novamente." });
    }
});



















module.exports = router