const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  // console.log(req.headers.cookie.split("jwt=")[1]);
  // if (req.headers.cookie === undefined) return res.status(401).json({ message: "Not authorized, no token" });

  const cookie = req.headers.cookie.split("jwt=")[1];


  token = cookie;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invaild token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = protect;