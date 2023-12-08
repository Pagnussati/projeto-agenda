const express = require('express');
const route = express.Router();

const homeController = require('./source/controllers/home.js');
const loginController = require('./source/controllers/login.js');

// Home
route.get('/', homeController.index);

// Login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);

module.exports = route;