const route = require('express').Router();

const {authUser, registerUser, loggoutUser }    = require('../controller/userController.js');
const  protect  = require('../middleware/authMiddleware.js');

route.post('/register',registerUser);
route.post('/login', authUser);
route.get('/logout', protect, loggoutUser);


module.exports = route;