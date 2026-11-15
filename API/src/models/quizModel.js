var database = require("../database/config")

function listar(){
    var instrucao =
    `SELECT * FROM quiz`;
    console.log("Executando a instrução SQL \n" + instrucao);
    return database.executar(instrucao)
}

function cadastrar(resposta){
     var instrucao = 
     `INSERT INTO quiz (resposta) VALUES (?)`;

     console.log("Executando a instrução SQL: \n" + instrucao)
     return database.executar(instrucao, [resposta])
}

module.exports = {
    cadastrar,
    listar
};
