var quizModel = require("../models/quizModel");

function listar(req, res){
    quizModel.listar().then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    });
}

function criarTentativa(req, res){
    var fkUsuario = req.body.fk_usuario;

    if(fkUsuario == undefined){
        return res.status(400).send("Usuario nao informado");
    }

    quizModel.criarTentativa(fkUsuario).then(function(resultado){
        var idTentativa = null;
        if(resultado){
            if(resultado.insertId) idTentativa = resultado.insertId;
            else if(resultado[0] && resultado[0].insertId) idTentativa = resultado[0].insertId;
        }
        return res.status(201).json({ id_tentativa: idTentativa });
    }).catch(function(erro){
        return res.status(500).json(erro.sqlMessage);
    });
}

function registrarResposta(req, res){
    var fkTentativa = req.body.fk_tentativa;
    var numQuestao = req.body.num_questao;
    var letra = req.body.letra;

    if(fkTentativa == undefined || numQuestao == undefined || letra == undefined){
        return res.status(400).send("Dados da resposta incompletos");
    }

    quizModel.registrarResposta(fkTentativa, numQuestao, letra).then(function(){
        return res.status(201).json({ mensagem: "Resposta registrada" });
    }).catch(function(erro){
        return res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    listar,
    criarTentativa,
    registrarResposta
};
