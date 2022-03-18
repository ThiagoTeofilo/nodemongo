const mongoose = require("mongoose")

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("usuario", usuarioSchema)

//model da aplicação

//Basicamente, essa parte faz um modelo de como os dados devem ser inseridos no banco de dados.
//Aqui eh criado um schema, q eh a mesma coisa q uma collection (ou tabela), onde o sistema espera receber
//um objeto em formato json, com as seguintes chaves: "nome" e "senha".
//Após supostamente esse schema, baseado nesse modelo, ser criado em uma rota POST, ele será salvo no
//banco de dados q foi definido na área index.js desta aplicação (ver parte onde foi configurado o banco de dados).

//Module.exports = mongoose.model("usuario", usuarioSchema) <- essa parte "usuario", está dando
//O nome da collection onde o schema será criado no banco de dados. Onde, a ela será inserida o modelo
//usuarioSchema.

//ou seja, nesta aplicação ficou assim:

//banco de dados: nodemongo
//collection: usuario
//jsons: {"nome": "...", "senha": "...."}