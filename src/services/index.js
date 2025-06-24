// src/services/index.js
const CustomPaymentService = require("../modules/src/custom-payment.service");

module.exports = {
  registerServices: ({ container }) => {
    container.register({
      customPaymentService: awilix.asClass(CustomPaymentService).singleton(),
    });
  },
};