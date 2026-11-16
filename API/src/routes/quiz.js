var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

// Cria uma nova tentativa de quiz para um usuário logado
router.post("/tentar", function (req, res) {
    quizController.criarTentativa(req, res);
});

// Registra a resposta de uma questão dentro de uma tentativa
router.post("/respostas", function (req, res) {
    quizController.registrarResposta(req, res);
});

// Lista os resultados (views do dashboard)
router.get("/listar", function (req, res) {
    quizController.listar(req, res);
});

module.exports = router;
