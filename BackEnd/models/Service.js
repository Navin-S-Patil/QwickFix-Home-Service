const mongoose = require("mongoose");


const serviceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: [true, 'Service name is required'],
    },
    serviceKeyword: {
      type: String,
      required: [true, 'Service Keyword is required'],
    },
    associatedServiceman: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
