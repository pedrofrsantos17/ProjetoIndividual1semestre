var express = require("express");
var router = express.Router();

var quizcontroller = require("../controllers/quizController")

router.post("/cadastrar", function (req, res) {
quizcontroller.cadastrar(req,res)

});

router.get("/listar", function (req, res){
quizcontroller.listar(req, res)
})

module.exports = router