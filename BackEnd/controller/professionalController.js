const asyncHandler = require("express-async-handler");
const Employee = require("../models/Employee");

const generateToken = require("../utils/generateTokens");

//@desc    Auth (login) professional/set token
//route    POST /api/professional/auth
//@access  Public
const authProfessional = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const professional = await Employee.findOne({ email });

  if (professional && (await professional.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid username or password");
  }
});

//@desc    Register new professional
//route    POST /api/professional/register
//@access  Public
const registerProfessional = asyncHandler(async (req, res) => {

  const role = "professional";

  const { name, phone, email, password, address, selectedServices } = req.body;

  console.log(req.body);

  // Check if the username is already taken
  const userExists = await Employee.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "Professional already exists, user some other Email" });
    return;
  }


  // Create a new user
  const newProfessional = await Employee.create({
    name,
    email,
    password,
    phone,
    address,
    role,
    services: selectedServices
  });


  if (newProfessional) {
    generateToken(res, newProfessional._id);
    res.status(201).json({
      name: newProfessional.name,
      email: newProfessional.email,
      phone: newProfessional.phone,
      role: newProfessional.role,
      services: newProfessional.services
    });
  } else {
    res.status(400);
    throw new Error("Invalid Professional data");
  }
});

//@desc    logout user
//route    POST /api/users/logout
//@access  Private
const loggoutProfessional = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "Professional Loggout",
  });
});



module.exports = { authProfessional, registerProfessional, loggoutProfessional };