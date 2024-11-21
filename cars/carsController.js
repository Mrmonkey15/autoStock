const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.send("hello world");
});


router.get ('/cars/new',(req,res)=>{
    res.render('./cars/new')
})


module.exports = router; 
