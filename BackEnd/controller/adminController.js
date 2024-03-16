const Employee = require("../models/Employee");
const Service = require("../models/Service");
const User = require("../models/User");

const handleBlock = (async (_, res) => {
    try {
        /**
         * @todo implement it
         */
    } catch (err) {
        res.status(500).json({ msg: 'Internal Server Error', code: 500, error: err.message });
    }
});

const allUsers = async (_, res) => {
    try {
        const employeeData = await Employee.find();
        const userData = await User.find();
        res.status(200).json({ code: 200, msg: 'Success', data: { userData, employeeData } });
    } catch (err) {
        res.status(500).json({ msg: 'Internal Server Error', code: 500, error: err.message });
    }
};

const allService = async (_, res) => {
    try {
        const servideData = await Service.find();
        res.status(200).json({ code: 200, msg: 'Success', data: servideData });
    } catch (err) {
        res.status(500).json({ msg: 'Internal Server Error', code: 500, error: err.message });
    }
};


const addService = async (_, res) => {
    try {
        const { serviceName, serviceKeyword } = req.body;
        const newService = new Service({
            serviceName,
            serviceKeyword,
        });
        await newService.save();
        res.status(200).json({ code: 200, msg: 'Success' });
    } catch (err) {
        res.status(500).json({ msg: 'Internal Server Error', code: 500, error: err.message });
    }
};

module.exports = { addService, allService, allUsers };