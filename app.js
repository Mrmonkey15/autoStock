// Dependências básicas

const express = require('express')
const app = express()
const port = 3000
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// importa controlers
const carsController= require("./cars/carsController")


//  data base

const connection = require('./db/db');
const Car = require('./cars/Cars')
async function connectToDatabase() {
  try {
    await connection.authenticate();  // Tenta conectar ao banco de dados
    console.log("Conectou com o banco de dados");
  } catch (error) {
    console.log("Erro ao conectar com o banco de dados:", error.message);
  }
}
connectToDatabase();

// importa as Rotas

app.use("/", carsController);


// renderização principal
app.get("/", (req,res)=>{
    res.render('index.ejs')

})

// Rodando o servidor

app.listen(port, ()=>{
    console.log("servidor rodando")
})