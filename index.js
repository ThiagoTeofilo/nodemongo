require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const app = express()

// forma de ler json / middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// rotas
const inicialRouter = require("./routes/inicial")
app.use("/", inicialRouter)

const usuariosRouter = require("./routes/usuarios")
app.use("/usuarios", usuariosRouter)

// banco de dados
// mongoose.connect("mongodb://localhost/nodemongo")
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on("error", (error) => console.log(error))
db.once("open", () => console.log("conectado ao banco de dados"))

// porta
const porta = 3000
app.listen(porta, () => {
    console.log(`servidor ok .. http://localhost:${porta}`)
})