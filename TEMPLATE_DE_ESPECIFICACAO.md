# Titulo do documento

## 1. Contexto

O basquete é o 4º esporte mais praticado do planeta, segundo pesquisa do COI citada no Projeto Individual do 1º Semestre. Iniciativas como a NBA Station (Brasil) e o Instituto Stephen Curry (EUA) mostram que o esporte também é ferramenta de inclusão e educação. Mesmo assim, fãs brasileiros têm dificuldade em encontrar, em um só lugar e em português, conteúdo que una a história do basquete (da invenção por James Naismith, em 1891, até a criação da NBA, em 1949) e a paixão pela liga atual. O autor, Pedro Henrique Ferreira Rodrigues Santos, é apaixonado por esportes desde a infância e escolheu a NBA como tema por representar algo de seu gosto, como pede o desafio.

O Desafio do Semestre da São Paulo Tech School (Pesquisa e Inovação, Projeto Individual 2026-2) exige o desenvolvimento de um **website com formulário de cadastro**, usando HTML, CSS e validações de formulário em JavaScript, com uma **API Node.js** para cadastro e/ou consulta em um **banco de dados**. O projeto deve aplicar o conteúdo de todas as disciplinas do semestre (Tecnologia da Informação, Banco de Dados, Algoritmos, Arquitetura de Computadores e Matemática, Introdução aos Sistemas Operacionais, Pesquisa e Inovação e Socioemocional). O foco é o aprendizado individual: a IA pode ser usada como apoio, mas o aluno precisa saber explicar cada camada (front-end, back-end, banco de dados e a comunicação entre elas).

Hoje existe um protótipo estático do site **PULL UP HOOPS**, com a página inicial (`Home.html`) e a página de cadastro (`Cadastro.html`), que compartilham o arquivo `Style.css`. A Home já apresenta o autor, a proposta do site e a história do basquete. O Cadastro já tem formulário e validações em JavaScript, mas com falhas: a checagem de letra maiúscula na senha não funciona, a validação de e-mail é superficial, o CPF só tem o tamanho conferido e nenhum dado é enviado a uma API nem gravado em banco. Faltam a tela de login, a API, o banco de dados, o dashboard e a documentação.

Há a necessidade de completar o projeto com base em requisitos escritos antes da implementação (Spec-Driven Development, conforme a Aula Bootcamp 2), para que o desenvolvimento assistido por IA não dependa de decisões implícitas e possa ser validado por critérios objetivos.

## 2. Objetivo

Entregar um site sobre a NBA e a história do basquete, chamado **PULL UP HOOPS**, em que o visitante conhece o tema, cria uma conta com seu jogador favorito, faz login e acompanha, em um dashboard, indicadores calculados a partir dos dados cadastrados (por exemplo, os jogadores favoritos mais citados).

O resultado esperado é um sistema funcional de ponta a ponta (front-end, API Node.js e banco de dados), com o código versionado em um repositório Git público, documentado e explicável pelo autor. Esse sistema deve poder ser apresentado à banca em 10 minutos, entre 30/11 e 04/12, de forma a "vender a ideia" do projeto, incluindo a linha da vida do autor, os valores representados, a maior dificuldade, a maior superação e a gratidão.

## 3. Escopo

Esta versão corresponde ao Projeto Individual do 2º semestre de 2026, conforme o cronograma do desafio: tema e documentação com Git (semana 2), Home (semana 3), Cadastro e Login com for/vetor (semana 4), Dashboard (semana 5) e apresentação em PPT (semana 6). O sistema deve usar apenas as tecnologias do material de apoio e respeitar a arquitetura proposta; qualquer tecnologia fora do material exige justificativa e aprovação prévia do professor.

- **Dentro do escopo:**
  - **Front-end (HTML, CSS e JavaScript):** Home, Cadastro, Login e Dashboard, com folha de estilos compartilhada (`Style.css`) e validação dos formulários no navegador.
  - **API Node.js:** rotas para cadastrar usuário, autenticar usuário e consultar os dados do dashboard.
  - **Banco de dados relacional:** modelo lógico, relacionamentos e comandos SQL (criação das tabelas, inserções e consultas), instalado em uma VM Linux que contém somente o banco.
  - **Dashboard e indicadores:** gráficos e números calculados a partir dos dados do banco, com cálculos matemáticos feitos no código (contagem, percentual e média), usando vetores, repetições (`for`) e condicionais.
  - **Documentação e governança:** documento do projeto (contexto, planejamento, requisitos), quadro de planejamento no Trello, repositório Git público compartilhado com os professores no Moodle, com commits frequentes, e **Diário de Prompts** (o que foi pedido, qual assistente de IA foi usado, o que foi mudado e, se houver, o link da conversa).
  - **Apresentação final:** PPT de 10 minutos para a banca, com a demonstração do site e os itens socioemocionais (linha da vida, valores, dificuldade, superação e gratidão).
- **Fora do escopo:**
  - Recuperação e redefinição de senha, confirmação por e-mail, sessões com tokens (JWT) e níveis de permissão (administrador x comum).
  - Edição e exclusão de usuários (CRUD completo) e telas de administração.
  - Rankings, estatísticas oficiais, resultados de jogos e notícias da NBA por integração com APIs externas.
  - Validação do CPF pelos dígitos verificadores (apenas formato e dígitos repetidos).
  - Criptografia (hash) da senha, publicação em nuvem e bibliotecas ou frameworks fora do material de apoio, salvo justificativa e aprovação prévia do professor.
  - Geração do projeto inteiro por IA, mudança da arquitetura proposta ou entrega de código que o autor não saiba explicar (não será aceito pelo desafio).

## 4. Funcionalidades

**F1. Visualizar a página inicial.** O visitante vê o hero com a pergunta "Porquê este amor insaciável sobre a NBA?", as seções Sobre Mim, O que é este site?, Mundo da NBA, História do Basquete (Naismith em 1891, primeiro jogo da BAA em 1946 e criação da NBA em 1949) e a galeria de imagens com legenda sobre Stephen Curry.

**F2. Navegar entre as páginas.** O cabeçalho tem os botões "Login" e "Cadastro", e o logotipo "PULL UP HOOPS" leva de volta à Home em todas as páginas.

**F3. Cadastrar-se.** O visitante informa nome completo, e-mail, senha, CPF, jogador favorito da NBA e o motivo da escolha. O front-end valida os dados, envia à API, que grava o usuário no banco e responde com sucesso ou erro.

**F4. Receber feedback.** Cada campo inválido gera uma mensagem específica. Em caso de sucesso, o sistema exibe "Cadastro realizado com sucesso!", limpa o formulário e oferece o caminho para o Login.

**F5. Fazer login.** O usuário informa e-mail e senha. A API consulta o banco e, se as credenciais conferirem, devolve os dados do usuário (id e nome). O front-end guarda esses dados na sessão do navegador e redireciona para o Dashboard. Credenciais inválidas geram mensagem de erro.

**F6. Visualizar o dashboard.** Apenas o usuário logado acessa o Dashboard, que exibe: total de usuários cadastrados, jogador favorito mais citado, ranking dos jogadores favoritos (gráfico de barras com quantidade e percentual) e uma lista dos motivos mais recentes. Os dados vêm da API, que os consulta no banco.

**F7. Sair (logout).** O usuário encerra a sessão, os dados guardados no navegador são removidos e ele volta para a Home.

## 5. Regras de negócio

**Campos do cadastro**

| Campo | Obrigatório | Regra |
|---|---|---|
| Nome completo | Sim | Mínimo de 3 caracteres; apenas letras e espaços (acentos permitidos). |
| E-mail | Sim | Deve conter `@` e `.`, com `@` antes do último `.`, sem espaços. Deve ser único. |
| Senha | Sim | Mínimo de 8 caracteres, com pelo menos 1 número e 1 letra maiúscula. |
| CPF | Sim | Após remover pontos e traço, exatamente 11 dígitos, sem todos os dígitos iguais. Deve ser único. |
| Jogador favorito da NBA | Não | Texto livre. Se vazio, é gravado como "Não informado" e não entra nos rankings do dashboard. |
| Por que esse jogador? | Sim | Mínimo de 10 caracteres. |

**Validações**
- O front-end valida todos os campos antes de chamar a API, guardando os erros em um vetor de validações. A requisição só é enviada quando o vetor está vazio.
- Todos os erros são informados na mesma tentativa, não apenas o primeiro.
- A API repete as validações obrigatórias, pois não pode confiar apenas no front-end. Dados inválidos retornam status 400 com mensagem.
- As consultas ao banco usam parâmetros (placeholders `?`) e nunca concatenam dados digitados, para evitar SQL injection.

**Dados duplicados**
- E-mail e CPF não podem se repetir. Uma tentativa duplicada não grava nada e retorna a mensagem "E-mail já cadastrado" ou "CPF já cadastrado" (status 409).
- Para o e-mail, a comparação ignora maiúsculas e minúsculas e espaços nas pontas.

**Login**
- E-mail e senha são obrigatórios. Se não existir usuário com o par e-mail e senha, a mensagem é "E-mail ou senha inválidos", sem indicar qual dos dois está errado (status 401).
- A senha aparece mascarada na tela e nunca é exibida em mensagens, no console ou nas respostas da API.
- Páginas restritas (Dashboard) só abrem com sessão ativa; sem sessão, o usuário é redirecionado ao Login.

**Edição e exclusão**
- Nesta versão não há edição nem exclusão de usuários. Depois de cadastrado, o dado só pode ser alterado diretamente no banco, por quem o administra.

**Banco de dados e dados pessoais**
- Tabela `usuario`: `id_usuario` (chave primária, autoincremento), `nome`, `email` (único), `senha`, `cpf` (único), `jogador_favorito`, `motivo` e `dt_cadastro` (preenchida automaticamente).
- O CPF e a senha são dados sensíveis: não podem aparecer no dashboard, em logs ou em respostas da API (a rota de dashboard devolve apenas dados agregados e motivos sem identificar o usuário).
- O banco fica em uma VM Linux separada, que contém somente o banco de dados; a API se conecta a ele por variáveis de ambiente (usuário, senha e host não ficam no código nem no repositório).

**Indicadores do dashboard**
- Percentual de um jogador = (quantidade de usuários que o escolheram ÷ total de usuários com jogador informado) × 100, com uma casa decimal.
- Em caso de empate no jogador mais citado, vale o que foi citado primeiro (menor `id_usuario` entre os empatados).
- Sem usuários cadastrados, o dashboard mostra "Ainda não há dados" em vez de gráficos vazios ou erros.

**Processo e uso de IA**
- A IA é permitida como apoio (tirar dúvidas, revisar, gerar testes e trechos de código dentro da arquitetura). Todo uso deve ser registrado no Diário de Prompts, e um trecho que o autor não saiba explicar não conta como entregue.
- O código deve ser versionado em repositório Git público, com commits frequentes, e a especificação deve ser atualizada antes de qualquer mudança de requisito.

## 6. Interface

**Identidade visual**
- Marca **PULL UP HOOPS** em texto e com a imagem `logo.png` no topo de todas as páginas.
- Um único `Style.css`, com tema, cores, tipografia e botões consistentes, em tom esportivo (fundo escuro e cores de destaque, em linha com o basquete).
- Layout responsivo: legível em celular e em computador, sem rolagem horizontal.
- Toda imagem tem texto alternativo (`alt`).

**Home**
- Cabeçalho com logotipo, imagem e botões "Login" e "Cadastro".
- Hero com título e pergunta de abertura.
- Seções em sequência: Sobre Mim, O que é este site?, Mundo da NBA, História do Basquete (texto com as imagens de James Naismith e do primeiro jogo) e Galeria de Imagens (Stephen Curry com legenda, jogada, Chase Center e torcida).
- Rodapé com o ano e o nome do autor.

**Cadastro**
- Logotipo no topo e um cartão central com o título "Cadastro".
- Formulário com rótulos associados aos campos (`for` e `id` coerentes), na ordem: Nome completo, Email, Senha, CPF, Jogador favorito da NBA, Por que esse jogador? (área de texto).
- Botão "Cadastrar" ao final e, abaixo, link "Já tem conta? Faça login".
- Mensagens de erro junto ao campo ou por aviso, e mensagem de sucesso em destaque verde abaixo do formulário, que é ocultada ao iniciar uma nova tentativa.
- Durante o envio, o botão fica desabilitado para evitar cadastros duplicados por clique repetido.

**Login**
- Mesmo cabeçalho e identidade visual do Cadastro, com campos de e-mail e senha (mascarada) e botão "Entrar".
- Mensagem de erro em destaque para credenciais inválidas e link "Ainda não tem conta? Cadastre-se".

**Dashboard**
- Cabeçalho com o nome do usuário logado e botão "Sair".
- Faixa de indicadores (cartões): total de usuários e jogador favorito mais citado.
- Gráfico de barras com o ranking dos jogadores favoritos (quantidade e percentual) e lista com os motivos mais recentes.
- Estado vazio com mensagem amigável e estado de erro quando a API não responder.

**Mensagens padronizadas**
- "Nome deve ter no mínimo 3 caracteres" / "Nome deve conter apenas letras"
- "Email inválido: deve conter @ e ."
- "Senha deve ter no mínimo 8 caracteres" / "Senha deve conter pelo menos 1 número" / "Senha deve conter pelo menos 1 letra maiúscula"
- "CPF deve ter 11 dígitos" / "CPF inválido: não pode ter todos os dígitos iguais"
- "O motivo deve ter no mínimo 10 caracteres"
- "E-mail já cadastrado" / "CPF já cadastrado"
- "E-mail ou senha inválidos"
- "Cadastro realizado com sucesso!"

## 7. Critérios de aceitação

- A Home exibe todas as seções (hero, Sobre Mim, O que é este site?, Mundo da NBA, História do Basquete, Galeria de Imagens e rodapé), as imagens carregam e têm `alt`.
- Os botões "Login" e "Cadastro" abrem as respectivas páginas e o logotipo leva de volta à Home.
- No Cadastro, enviar com qualquer campo obrigatório vazio não chama a API e mostra a mensagem correspondente.
- Nome com menos de 3 caracteres ou com números (ex.: "Jo", "Pedro123") é rejeitado; "Pedro Santos" é aceito.
- E-mail sem `@` ou sem `.` (ex.: "pedro.com", "pedro@gmail") é rejeitado; "pedro@email.com" é aceito.
- Senha com menos de 8 caracteres, sem número ou sem maiúscula (ex.: "abc123", "abcdefgh", "abcdefg1") é rejeitada; "Basquete10" é aceita.
- CPF sem 11 dígitos ou com todos os dígitos iguais (ex.: "111.111.111-11") é rejeitado; "123.456.789-09" passa na validação de formato.
- Motivo com menos de 10 caracteres é rejeitado, e o jogador favorito pode ficar em branco.
- Quando vários campos estão inválidos, todos os erros são informados na mesma tentativa.
- Com todos os campos válidos, o usuário é gravado na tabela `usuario` (conferido com `SELECT` no banco), aparece "Cadastro realizado com sucesso!" e o formulário é limpo.
- Cadastrar de novo o mesmo e-mail (inclusive com maiúsculas diferentes) ou o mesmo CPF não cria outro registro e mostra "E-mail já cadastrado" ou "CPF já cadastrado".
- Chamar a API diretamente (sem passar pelo front-end) com dados inválidos retorna status 400 e não grava nada.
- Login com e-mail e senha corretos redireciona para o Dashboard e mostra o nome do usuário; com dados errados mostra "E-mail ou senha inválidos" e permanece no Login.
- Abrir o Dashboard sem estar logado redireciona para o Login; ao clicar em "Sair", a sessão é encerrada e o Dashboard volta a ficar bloqueado.
- Os números do Dashboard (total de usuários, jogador mais citado e percentuais) coincidem com o resultado das consultas SQL equivalentes feitas direto no banco; sem usuários, aparece "Ainda não há dados".
- Nenhuma resposta da API, tela ou log expõe a senha ou o CPF de usuários, e as consultas usam parâmetros (placeholders), sem concatenar dados digitados.
- O banco roda na VM Linux que contém somente o banco, e a API se conecta a ele sem credenciais escritas no código do repositório.
- O repositório Git é público, tem commits frequentes que mostram a evolução, e o Diário de Prompts está preenchido (o que foi pedido, a IA usada e o que foi mudado).
- O autor consegue explicar qualquer trecho, fazer uma alteração ao vivo e desenhar o fluxo front-end → API → banco.
- A apresentação de 10 minutos demonstra o site funcionando e inclui linha da vida, valores, maior dificuldade, maior superação e gratidão.
- Nenhum erro aparece no console do navegador nem no terminal da API durante o uso normal.
