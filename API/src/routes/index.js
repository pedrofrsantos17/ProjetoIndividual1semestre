var express = require("express");
var path = require("path");
var router = express.Router();

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

router.get("/quiz", function (req, res) {
    res.sendFile(path.join(__dirname, "../../DOCUMENTOS_DE_APOIO/exemplo_de_quiz/EXEMPLO_QUIZZ.html"));
});

module.exports = router;
