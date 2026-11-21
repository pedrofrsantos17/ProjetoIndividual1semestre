var database = require("../database/config")

function registrar(resposta){
    var instrucao =
    `INSERT INTO enquete (resposta) VALUES (?);`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao, [resposta]);
}

function listar(){
    var instrucao =
    `SELECT resposta, COUNT(*) AS total FROM enquete GROUP BY resposta;`;
    console.log("Executando a instrução SQL \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    registrar,
    listar
};
