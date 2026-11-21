var enqueteModel = require("../models/enqueteModel");

function registrar(req, res){
    var resposta = req.body.resposta;

    if(resposta == undefined){
        return res.status(400).send("Resposta nao informada");
    }

    enqueteModel.registrar(resposta).then(function(){
        return res.status(201).json({ mensagem: "Voto registrado" });
    }).catch(function(erro){
        return res.status(500).json({ mensagem: "Erro ao registrar voto" });
    });
}

function listar(req, res){
    enqueteModel.listar().then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json({ mensagem: "Erro ao carregar enquetes" });
    });
}

module.exports = {
    registrar,
    listar
};
