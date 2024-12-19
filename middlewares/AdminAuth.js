async function AdmAuth(req,res,next){
    try{
        if(req.session.user.role == "administrador"){
            return next()
    
        } else{
            return res.json({erro: `Acesso não autorizado, o usuário não possui as credênciais necessárias`});
        }
    }catch(err){
        console.log(err)

    }
}

module.exports = AdmAuth
