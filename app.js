// Dependências básicas

const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')
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

app.post("")
// Rodando o servidor

app.listen(port, ()=>{
    console.log("servidor rodando")
})