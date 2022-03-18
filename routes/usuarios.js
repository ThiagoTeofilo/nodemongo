const express = require("express")
const Usuario = require("../models/usuario")
const router = express.Router()

//getting all
router.get("/", async (req, res) => {
    try {
        const usuarios = await Usuario.find()
        res.json(usuarios)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//getting one
router.get("/:id", getUsuario, (req, res) => {
    res.json(res.usuario)
        //pela função middleware getUsuario, res.usuario foi definido a partir da variável usuario,
        //q por sua vez, foi achada pelo id (req.params.id, q está na função middleware getUsuario).
        //ou seja, basicamente, aqui em res.json(res.usuario), estamos exibindo 
        //o objeto json postado na requisição, onde o tal objeto foi selecionado pelo id
})

//creating one
router.post("/", async (req, res) => {
    const usuario = new Usuario({
        nome: req.body.nome,
        senha: req.body.senha
    })

    try {
        const novoUsuario = await usuario.save()
        res.status(201).json(novoUsuario)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//updating one
router.patch("/:id", getUsuario, async (req, res) => {
    if (req.body.nome != null) {
        res.usuario.nome = req.body.nome
    }
    if (req.body.senha != null) {
        res.usuario.senha = req.body.senha
    }
    try {
        const updatedUsuario = await res.usuario.save()
        res.json(updatedUsuario)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//deleting one
router.delete("/:id", getUsuario, async (req, res) => {
    try {
        await res.usuario.remove()
        res.json({ message: "usuario apagado" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//função de middleware

async function getUsuario(req, res, next) {
    let usuario
    
    try {
        usuario = await Usuario.findById(req.params.id)
            //usuario eh definido pelo id passado na requisição
                //ou seja, quando eu posto algo pelo método POST,
                //(no caso o nome e a senha), a variável usuario aqui definida,
                //será o conjunto do nome e senha, onde, será "achada" pelo id (.findById)
        if (usuario == null) {
            return res.status(404).json({ message: "Usuario não encontrado" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.usuario = usuario
        //a variável usuario será jogada em res.usario
    next()
}

module.exports = router