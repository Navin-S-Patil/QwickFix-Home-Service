const mongoose = require("mongoose");

const ServiceHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  service: {
    name : { type: String, required: true },
    email : { type: String, required: true },
    serviceName : { type: String, required: true },
    date : { type: Date, required: true },
    address : { type: String, required: true },
    city : { type: String, required: true },
    note : { type: String, required: false },
    phone : { type: String, required: true },
    serviceDesc : { type: String, required: true },

    serviceStatus: { type: String, default: "Pending"},
    rating: { type: Number },
  },
});



const ServiceHistory = mongoose.model("ServiceHistory", ServiceHistorySchema);
module.exports = ServiceHistory;