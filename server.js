// Configuração do dotenv para carregar variáveis de ambiente de um arquivo .env
require('dotenv').config();

// Importação de bibliotecas/frameworks necessárias
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Conexão com o banco de dados MongoDB usando a string de conexão definida no arquivo .env
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => { app.emit('Ready') })  // Emite o evento 'Ready' quando a conexão é estabelecida com sucesso
    .catch((e) => { console.log(e) });

// Importação de módulos para gerenciamento de sessões, armazenamento no MongoDB, flash messages, etc.
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

// Importação de outros módulos e configurações necessárias
const routes = require('./routes');  // Importa as rotas do aplicativo
const path = require('path');
const helmet = require('helmet');  // Adiciona headers HTTP para segurança
const csrf = require('csurf');  // Adiciona proteção CSRF

// Importação de middlewares personalizados
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./source/middlewares/middleware');

// Configuração de middlewares e recursos do Express
app.use(express.urlencoded({ extended: true }));  // Middleware para análise de corpos de requisição com URL codificada
app.use(express.json()); // Middleware para analisar automaticamente o corpo de requisições com formato JSON
app.use(express.static(path.resolve(__dirname, 'public')));  // Middleware para servir arquivos estáticos (por exemplo, CSS, imagens)

// Configuração da sessão
const sessionOptions = session({
    secret: 'wadwadawdawdawdawdawd()',  // Segredo usado para assinar as sessões
    store: MongoStore.create({mongoUrl: process.env.CONNECTIONSTRING}),  // Armazenamento da sessão no MongoDB
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,  // Tempo de vida do cookie de sessão (7 dias)
        httpOnly: true,  // Acesso apenas por meio de solicitações HTTP, não via JavaScript
    }
});

// Aplica o middleware de sessão ao aplicativo
app.use(sessionOptions);

// Configuração de mensagens flash para notificações temporárias entre requisições
app.use(flash());

// Melhorias de segurança fornecidas pelo pacote Helmet
app.use(helmet());

// Configuração do mecanismo de visualização e diretório de visualizações
app.set('views', path.resolve(__dirname, 'source', 'views'));
app.set('view engine', 'ejs');

// Proteção CSRF
app.use(csrf());

// Aplica middlewares personalizados
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);

// Aplica as rotas definidas no arquivo './routes'
app.use(routes);

// Aguarda o evento 'Ready' e inicia o servidor na porta 3000
app.on('Ready', () => {
    app.listen(3000, () => {
        console.log('Acesse http://localhost:3000');
        console.log('Servidor está aberto');
    });
});
