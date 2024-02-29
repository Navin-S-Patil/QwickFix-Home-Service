const route = require("express").Router();

const { bookService, getServices } = require("../controller/serviceController.js");
const protect  = require("../middleware/authMiddleware.js");

route.post("/bookService",protect, bookService);
route.get("/getServices",protect, getServices);

module.exports = route;