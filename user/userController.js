const express = require("express");
const router = express.Router();
const Users = require("./Users");
const bcrypt = require('bcrypt')

router.get("/admin/create-user",(req,res)=>{
    res.render('admin/create')
})

router.post("/api/register/user", async(req,res)=>{
    try{
        const name = req.body.name;
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password
        const role = req.body.role; 
    
        const salt = bcrypt.genSalt(10)
        const hash = bcrypt.hash(password,salt)
    
       const response =await Users.create({
            username:username,
            email:email,
            password:hash,
            role:role
        })

        res.send(response.toJSON)
    }catch(err){
        console.log("erro ao cadastrar usuário")
    }

    

})



















module.exports = router