const asyncHandler = require("express-async-handler");
const ServiceHistory = require("../models/ServiceHistory");
const User = require("../models/User");

//@desc    Book a Service req by user
//route    POST /api/service/bookService
//@access  Public
const bookService = asyncHandler(async (req, res) => {


    const { fullName, email, serviceName, serviceDate, address, city, note, phoneNumber, serviceDesc } = req.body;

    const user = User.findOne(email);

    const service = await ServiceHistory.create({
        user: user._id,
        service: {
            name: fullName,
            email,
            serviceName,
            date: serviceDate,
            address,
            city,
            note,
            phone: phoneNumber,
            serviceDesc
        }
    });

    if (service) {
        return res.status(201).json({ message: "Success" })
    }


});


const getServices = asyncHandler(async (req, res) => {
    const email = req.user.email;
    
    try {
        const services = await ServiceHistory.find({ 'service.email': email });

        if (services && services.length > 0) {
            return res.status(200).json(services);
        } else {
            return res.status(404).json({ message: "No Services Found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = { bookService , getServices};