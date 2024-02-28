const route = require("express").Router();

const { bookService } = require("../controller/serviceController.js");
const protect  = require("../middleware/authMiddleware.js");

route.post("/bookService",protect, bookService);

module.exports = route;