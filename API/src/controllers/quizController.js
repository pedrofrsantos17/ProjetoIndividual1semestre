var quizModel = require("../models/quizModel")

function listar(req, res){
    quizModel.listar().then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage)
    })
}

function cadastrar(req, res){
    var resposta = req.body.resposta;

    if(resposta == undefined){
        return res.status(400).send("Resposta não enviada");
    }

    quizModel.cadastrar(resposta).then(function(respostaBanco){
        res.status(200).send("Quiz Enviado com sucesso");
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    listar,
    cadastrar
};
