const route = require('express').Router();
const  protect  = require('../middleware/authMiddleware.js');

const {authProfessional, registerProfessional, loggoutProfessional }    = require('../controller/professionalController.js');


route.post('/register',registerProfessional);
route.post('/login', authProfessional);
route.get('/logout', protect, loggoutProfessional);


module.exports = route;