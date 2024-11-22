const express = require("express");
const router = express.Router();
const Brands = require("./Brands.js");

router.get('/', (req, res) => {
    res.send("hello world");
});


router.get ('/cars/new',async (req,res)=>{
    const brands = await Brands.findAll()
    res.render('./cars/new',{brands})
})






module.exports = router; 
