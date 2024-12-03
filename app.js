// Dependências básicas

const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')
const bcrypt = require('bcrypt')
const AdmAuth = require('./middlewares/Authenticate')
const Auth = require("./middlewares/Authenticate")
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,  // Deve ser true em produção, para HTTPS
    httpOnly: true,  // Impede o acesso ao cookie via JavaScript
    sameSite: 'strict',  // Impede o envio do cookie em requisições de outros sites
    maxAge: 3600000  // Sessão expira em 1 hora
  }
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
const connection = require('./db/db');
async function connectToDatabase() {
  try {
    await connection.authenticate();  // Tenta conectar ao banco de dados
    console.log("Conectou com o banco de dados");
  } catch (error) {
    console.log("Erro ao conectar com o banco de dados:", error.message);
  }
}
connectToDatabase();


// importa controlers
const carsController= require("./cars/carsController")
const userController =require("./user/userController")

//  data base


const Transactions = require('./cars/Transactions')
const Users = require('./user/Users')
const Car = require('./cars/Cars')
const Brands = require("./cars/Brands")


// importa as Rotas

app.use("/", carsController);
app.use("/", userController);

//configura o express session 



// renderização principal
app.get("/", (req,res)=>{
    res.render('index.ejs')

})
app.post("/login", async (req, res) => {
  try{
  const {email,pass} = req.body
  const user = await Users.findOne({
    where:{
      email:email
    }
  })
  if(user){
    const userPass = user.password;
    const passValidation = await bcrypt.compare(pass,userPass)
    if(passValidation){
      req.session.user={
        id: user.id,
        name: user.name,
        role: user.role 
      }
      console.log('Sessão criada:', req.session.user);  // Verifica a sessão
      return res.json({status: 'sucess', redirectURL: '/dashboard'})
    }else{
      res.status(401).json({msg: "Usuário ou senha incorreto"})
    }

  }else{
    res.status(400).json({ msg: "Usúario não cadastrado"})
  }
}catch (error) {
            // Mostra a mensagem de erro no console ou em um alerta
            if (error.response && error.response.data) {
                console.log(error.response.data.msg);
            } else {
                console.log("Erro ao enviar requisição");
            }
        }
})

//logout 

app.get("/logout",(req,res)=>{
  req.session.user = undefined;
  console.log(req.session.user)
  res.redirect("/")
})

//dashboard --- transferir para o User controler
app.get("/dashboard", Auth,(req,res)=>{
  res.send("dashboard")

})




// Rodando o servidor

app.listen(port, ()=>{
    console.log("servidor rodando")
})