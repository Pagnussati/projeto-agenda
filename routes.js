const express = require('express');
const route = express.Router();

const homeController = require('./source/controllers/home.js');
const loginController = require('./source/controllers/login.js');
const contatoController = require('./source/controllers/contact.js');

const { loginRequired } = require('./source/middlewares/middleware.js');


// Home
route.get('/', homeController.index);

// Login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

// Contato
route.get('/contatos/index', loginRequired, contatoController.index);
route.post('/contatos/register', loginRequired, contatoController.register);
route.get('/contatos/index/:id', loginRequired, contatoController.editIndex);

module.exports = route;