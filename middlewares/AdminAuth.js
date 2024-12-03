async function AdmAuth(req,res,next){
    try{
        if(req.session.user.role == "admin"){
            return next()
    
        } else{
            return res.redirect('/');
        }
    }catch(err){
        console.log(err)

    }
}

module.exports = AdmAuth
