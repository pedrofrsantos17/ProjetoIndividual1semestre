var express = require("express");
var router = express.Router();

var enqueteController = require("../controllers/enqueteController");

// Registra o voto da enquete "Já jogou basquete?"
router.post("/registrar", function (req, res) {
    enqueteController.registrar(req, res);
});

// Lista as quantidades de votos (Sim / Não)
router.get("/listar", function (req, res) {
    enqueteController.listar(req, res);
});

module.exports = router;
