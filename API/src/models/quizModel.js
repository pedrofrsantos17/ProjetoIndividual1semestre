var database = require("../database/config")

function listar(){
    // Retorna os resultados das tentativas finalizadas (dados agregados para o dashboard)
    var instrucao =
    `SELECT * FROM vw_resultado_tentativa;`;
    console.log("Executando a instrução SQL \n" + instrucao);
    return database.executar(instrucao);
}

function criarTentativa(fkUsuario){
    var instrucao =
    `INSERT INTO tentativa (fk_usuario) VALUES (?);`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao, [fkUsuario]);
}

function registrarResposta(fkTentativa, numQuestao, letra){
    // Localiza o id da alternativa a partir da questão (num_questao) e da letra (A, B, C, D)
    var instrucaoSelect =
    `SELECT id_alternativa FROM alternativa WHERE num_questao = ? AND letra = ?;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSelect);
    return database.executar(instrucaoSelect, [numQuestao, letra])
        .then(function (resultados) {
            var idAlternativa = resultados && resultados.length > 0 ? resultados[0].id_alternativa : null;
            if (idAlternativa === null || idAlternativa === undefined) {
                return Promise.reject(new Error("Alternativa nao encontrada"));
            }
            var instrucaoInsert =
            `INSERT INTO resposta (fk_tentativa, num_questao, fk_alternativa) VALUES (?, ?, ?);`;
            console.log("Executando a instrução SQL: \n" + instrucaoInsert);
            return database.executar(instrucaoInsert, [fkTentativa, numQuestao, idAlternativa]);
        });
}

module.exports = {
    criarTentativa,
    registrarResposta,
    listar
};
