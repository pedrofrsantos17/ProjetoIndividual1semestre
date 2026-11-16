var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);

                    if (resultadoAutenticar.length == 1) {
                        return res.json({
                            id: resultadoAutenticar[0].id_usuario,
                            nome: resultadoAutenticar[0].nome,
                            email: resultadoAutenticar[0].email
                        });
                    } else {
                        // E-mail ou senha inválidos
                        return res.status(401).send("E-mail ou senha inválidos");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores (a API não pode confiar apenas no front-end)
    if (nome == undefined || nome == "" || nome.length < 3) {
        return res.status(400).send("Nome deve ter no mínimo 3 caracteres");
    } else if (!nome.match(/^[A-Za-zÀ-ÿ\s]+$/)) {
        return res.status(400).send("Nome deve conter apenas letras");
    } else if (email == undefined || email == "" || !email.includes("@") || !email.includes(".") || email.lastIndexOf("@") > email.lastIndexOf(".")) {
        return res.status(400).send("Email inválido: deve conter @ e .");
    } else if (senha == undefined || senha == "" || senha.length < 8) {
        return res.status(400).send("Senha deve ter no mínimo 8 caracteres");
    } else if (!senha.split("").some(function (char) { return !isNaN(char); })) {
        return res.status(400).send("Senha deve ter pelo menos 1 número");
    } else if (senha !== senha.toUpperCase()) {
        return res.status(400).send("Senha deve ter pelo menos 1 letra maiúscula");
    }

    usuarioModel.cadastrar(nome, email, senha).then(
        function (resultado) {
            return res.status(201).json({ mensagem: "Cadastro realizado com sucesso!" });
        }
    ).catch(
        function (erro) {
            if (erro && erro.code === "ER_DUP_ENTRY") {
                if (erro.message.includes("email")) {
                    return res.status(409).send("E-mail já cadastrado");
                }
                return res.status(409).send("CPF já cadastrado");
            }
            return res.status(500).json(erro.sqlMessage);
        }
    );
}

module.exports = {
    autenticar,
    cadastrar
};
