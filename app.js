// Dependências básicas

const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')
const bcrypt = require('bcrypt')
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

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false,
            maxAge:50000
   }
}))


// renderização principal
app.get("/", (req,res)=>{
    res.render('index.ejs')

})
app.post("/login", async (req, res) => {
  try {
    const { email, pass } = req.body;

    // Validação básica
    if (!email || !pass) {
      return res.status(400).send("E-mail e senha são obrigatórios");
    }

    // Verifica se o usuário existe
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(400).send("E-mail não encontrado");
    }

    // Compara a senha fornecida com a senha armazenada no banco
    const correct = await bcrypt.compare(pass, user.password);

    if (!correct) {
      return res.status(400).send("Senha incorreta");
    }

    // Sessão criada com dados do usuário
    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role
    };

    // Redireciona para o dashboard
    return res.redirect("/dashboard");
  } catch (erro) {
    console.log(`Erro código ${erro}`);
    return res.status(500).send("Erro interno, por favor tente novamente.");
  }
});


//dashboard
app.get("/dashboard", (req,res)=>{
  res.send("Merda de portabilidade")

})

app.get('/perfil', (req, res) => {
  if (req.session.user) {
      res.send(`Usuário logado: ${req.session.user.username}, Role: ${req.session.user.role}`);
  } else {
      res.send('Você não está logado.');
  }
});



// Rodando o servidor

app.listen(port, ()=>{
    console.log("servidor rodando")
})