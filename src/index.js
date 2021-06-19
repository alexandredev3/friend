const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");
const path = require('path');
const router = require('./routes');
const session = require("express-session");
const cookieParser = require('cookie-parser');

// Iniciando o express
const app = express();

// Iniciando sessão
app.use(session({
    secret: "juntosParaOBem", 
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 300000 }
}));

// Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch((error) => {
        console.log(error);
    });

app.use(cookieParser());

// Configurando o View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Utilizando os arquivos static
app.use(express.static('public'));

// Configurando o Body parser
app.use(express.json()); // BodyParse esta deprecated, pode usar o express.json() ao inves.
app.use(express.urlencoded({ extended: true })); // mesma coisa para o urlencoded

// Rota index
app.get('/', (req, res) => {
    res.render('index');
});

// Rotas 
app.use(router);

// Servidor
const host = 'localhost';
const port = 5000;

app.listen(port, host, () => {
    console.log(`O servidor está rodando na porta http://${host}:${port}`);
});