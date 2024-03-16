const route = require('express').Router();

const { allUsers, allService, addService }    = require('../controller/adminController.js');

route.get('/get/service', allService);
route.get('/all/user', allUsers);
route.post('/create/service', addService);


module.exports = route;