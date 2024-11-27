const express = require("express");
const router = express.Router();const Users = require("./Users");

router.get("/admin/create-user",(req,res)=>{
    res.render('admin/create')
})




















module.exports = router