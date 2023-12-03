const express = require('express');
const route = express.Router();
const homeController = require('./source/controllers/home.js');
const customersController = require('./source/controllers/customers.js')

route.get('/', homeController.home);
route.post('/', homeController.homePost);

route.get('/customers', customersController.home);

module.exports = route;