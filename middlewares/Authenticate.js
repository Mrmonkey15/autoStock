async function Auth(req,res,next){
    try{
        if(req.session.user){
            return next()
    
        } else{
            return res.redirect('/');
        }
    }catch(err){
        console.log(err)

    }
}

module.exports = Auth
