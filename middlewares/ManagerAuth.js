async function Auth(req,res,next){
    try{
        if(req.session.user.role == "manager"){
            return next()
    
        } else{
            return res.redirect('/');
        }
    }catch(err){
        console.log(err)

    }
}

module.exports = Auth
