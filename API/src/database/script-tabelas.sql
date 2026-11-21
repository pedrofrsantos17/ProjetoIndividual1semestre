-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE pull_up_hoops ;
USE pull_up_hoops;

-- 1. USUÁRIO
CREATE TABLE usuario (
    id_usuario  INT AUTO_INCREMENT PRIMARY KEY,
    nome        VARCHAR(100) NOT NULL,
    email       VARCHAR(100) NOT NULL,
    senha       VARCHAR(100) NOT NULL,
    dt_cadastro DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_usuario_email UNIQUE (email),
    CONSTRAINT ck_usuario_nome  CHECK (CHAR_LENGTH(nome)  >= 3),
    CONSTRAINT ck_usuario_senha CHECK (CHAR_LENGTH(senha) >= 8)
);

-- 2. ALTERNATIVA (já guarda a questão: cada linha = uma alternativa
--    e o enunciado da questão a que ela pertence)

CREATE TABLE alternativa (
    id_alternativa INT AUTO_INCREMENT PRIMARY KEY,
    num_questao    TINYINT      NOT NULL,        -- 1, 2, 3, 4...
    questao        VARCHAR(255) NOT NULL,        -- enunciado ("pergunta" do HTML)
    letra          CHAR(1)      NOT NULL,        -- 'A','B','C','D'
    texto          VARCHAR(150) NOT NULL,
    correta        TINYINT(1)   NOT NULL DEFAULT 0,
    -- garante UMA alternativa correta por questão
    correta_unica  TINYINT GENERATED ALWAYS AS (IF(correta = 1, num_questao, NULL)) STORED,
    CONSTRAINT uq_alternativa_letra    UNIQUE (num_questao, letra),
    CONSTRAINT uq_alternativa_correta  UNIQUE (correta_unica),
    CONSTRAINT uq_alternativa_questao_id UNIQUE (id_alternativa, num_questao),  -- usado na FK de resposta
    CONSTRAINT ck_alternativa_letra    CHECK (letra IN ('A','B','C','D')),
    CONSTRAINT ck_alternativa_correta  CHECK (correta IN (0,1))
);


-- 3. TENTATIVA (uma jogada do quiz por um usuário)

CREATE TABLE tentativa (
    id_tentativa INT AUTO_INCREMENT PRIMARY KEY,
    fk_usuario   INT      NOT NULL,
    dt_inicio    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_tentativa_usuario FOREIGN KEY (fk_usuario) REFERENCES usuario (id_usuario),
    INDEX idx_tentativa_usuario (fk_usuario)
);

-- 4. RESPOSTA (a alternativa escolhida em cada questão da tentativa)
--    FK composta: a alternativa precisa pertencer à questão informada.

CREATE TABLE resposta (
    id_resposta    INT AUTO_INCREMENT PRIMARY KEY,
    fk_tentativa   INT      NOT NULL,
    num_questao    TINYINT  NOT NULL,
    fk_alternativa INT      NOT NULL,
    dt_resposta    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_resposta_tentativa   FOREIGN KEY (fk_tentativa) REFERENCES tentativa (id_tentativa) ON DELETE CASCADE,
    CONSTRAINT fk_resposta_alternativa FOREIGN KEY (fk_alternativa, num_questao)
        REFERENCES alternativa (id_alternativa, num_questao),
    CONSTRAINT uq_resposta_tentativa_questao UNIQUE (fk_tentativa, num_questao)  -- 1 resposta por questão
);


-- 5. DADOS INICIAIS (iguais ao vetor listaDeQuestoes do HTML)

INSERT INTO alternativa (num_questao, questao, letra, texto, correta) VALUES
(1, 'Qual o jogador mais velho da NBA atualmente', 'A', 'Stephen Curry',         0),
(1, 'Qual o jogador mais velho da NBA atualmente', 'B', 'Kevin Durant',          0),
(1, 'Qual o jogador mais velho da NBA atualmente', 'C', 'Victor Wenbanyama',     0),
(1, 'Qual o jogador mais velho da NBA atualmente', 'D', 'Lebron James',          1),
(2, 'Qual é o brasileiro com mais pontos na história', 'A', 'Nenê Hilário',      0),
(2, 'Qual é o brasileiro com mais pontos na história', 'B', 'Oscar Schimit',     1),
(2, 'Qual é o brasileiro com mais pontos na história', 'C', 'Leandro Barbosa',   0),
(2, 'Qual é o brasileiro com mais pontos na história', 'D', 'Gui Santos',        0),
(3, 'Quantos jogadores tem na quadra em um jogo oficial', 'A', 'Dez',            1),
(3, 'Quantos jogadores tem na quadra em um jogo oficial', 'B', 'Doze',           0),
(3, 'Quantos jogadores tem na quadra em um jogo oficial', 'C', 'Oito',           0),
(3, 'Quantos jogadores tem na quadra em um jogo oficial', 'D', 'Onze',           0),
(4, 'Qual é o time com mais títulos da história da NBA', 'A', 'Los Angeles Lakers',    0),
(4, 'Qual é o time com mais títulos da história da NBA', 'B', 'Golden State Warriors', 0),
(4, 'Qual é o time com mais títulos da história da NBA', 'C', 'Boston Celtics',        1),
(4, 'Qual é o time com mais títulos da história da NBA', 'D', 'Chicago Bulls',         0);

-- ---------------------------------------------------------------------
-- 6. VIEWS DO DASHBOARD (só dados agregados, sem nome nem e-mail)
-- ---------------------------------------------------------------------

-- Resultado de cada tentativa FINALIZADA (todas as questões respondidas).
-- Mesmas regras do finalizarJogo: <=30% / <90% / >=90%
CREATE VIEW vw_resultado_tentativa AS
SELECT t.id_tentativa,
       t.fk_usuario,
       t.dt_inicio,
       SUM(a.correta)                          AS acertos,
       COUNT(r.id_resposta) - SUM(a.correta)   AS erros,
       tot.total_questoes,
       ROUND(100 * SUM(a.correta) / tot.total_questoes, 2) AS percentual,
       CASE
           WHEN SUM(a.correta) / tot.total_questoes <= 0.3 THEN 'INSUFICIENTE'
           WHEN SUM(a.correta) / tot.total_questoes <  0.9 THEN 'REGULAR'
           ELSE 'EXCELENTE'
       END AS classificacao
FROM tentativa t
JOIN resposta r    ON r.fk_tentativa = t.id_tentativa
JOIN alternativa a ON a.id_alternativa = r.fk_alternativa
CROSS JOIN (SELECT COUNT(DISTINCT num_questao) AS total_questoes FROM alternativa) tot
GROUP BY t.id_tentativa, t.fk_usuario, t.dt_inicio, tot.total_questoes
HAVING COUNT(r.id_resposta) = tot.total_questoes;

-- Cartões: tentativas, jogadores, média, melhor e pior resultado
CREATE VIEW vw_resumo_quiz AS
SELECT COUNT(*)                       AS total_tentativas,
       COUNT(DISTINCT fk_usuario)     AS total_jogadores,
       ROUND(AVG(percentual), 1)      AS media_acerto_pct,
       MAX(percentual)                AS melhor_acerto_pct,
       MIN(percentual)                AS pior_acerto_pct
FROM vw_resultado_tentativa;

-- Barras: % de acerto por questão (quais são as mais difíceis)
CREATE VIEW vw_desempenho_questao AS
SELECT a.num_questao,
       MAX(a.questao)                                AS questao,
       COUNT(r.id_resposta)                          AS total_respostas,
       COALESCE(SUM(a.correta AND r.id_resposta IS NOT NULL), 0) AS acertos,
       ROUND(100 * SUM(a.correta AND r.id_resposta IS NOT NULL)
                 / NULLIF(COUNT(r.id_resposta), 0), 1) AS acerto_pct
FROM alternativa a
LEFT JOIN resposta r ON r.fk_alternativa = a.id_alternativa
                    AND r.fk_tentativa IN (SELECT id_tentativa FROM vw_resultado_tentativa)
GROUP BY a.num_questao;

-- Colunas/pizza: quantas vezes cada alternativa foi escolhida
CREATE VIEW vw_alternativas_escolhidas AS
SELECT a.num_questao,
       a.letra,
       a.texto,
       a.correta,
       COUNT(r.id_resposta) AS vezes_escolhida
FROM alternativa a
LEFT JOIN resposta r ON r.fk_alternativa = a.id_alternativa
                    AND r.fk_tentativa IN (SELECT id_tentativa FROM vw_resultado_tentativa)
GROUP BY a.id_alternativa, a.num_questao, a.letra, a.texto, a.correta;

-- Pizza: tentativas por classificação
CREATE VIEW vw_distribuicao_classificacao AS
SELECT classificacao, COUNT(*) AS quantidade
FROM vw_resultado_tentativa
GROUP BY classificacao;

-- 7. NOVA TABELA: ENQUETE 

CREATE TABLE enquete (
    id_enquete  INT AUTO_INCREMENT PRIMARY KEY,
    resposta    VARCHAR(10) NOT NULL,   -- 'SIM' ou 'NAO'
    dt_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Criando Usuario para insert e select
CREATE USER  'insert_select'@'%' IDENTIFIED BY 'Stark1105*';
GRANT SELECT, INSERT ON pull_up_hoops.* TO 'insert_select'@'%';
FLUSH privileges;
SHOW GRANTS FOR 'insert_select'@'%';