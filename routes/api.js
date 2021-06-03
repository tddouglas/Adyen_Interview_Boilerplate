var express = require('express');
var router = express.Router();
const { Client, Config, CheckoutAPI } = require("@adyen/api-library");


// ADYEN

// Adyen Node.js API library boilerplate (configuration, etc.)
const config = new Config();
config.apiKey = process.env.API_KEY;
console.log(process.env.API_KEY);
const client = new Client({ config });
client.setEnvironment("TEST");
const checkout = new CheckoutAPI(client);


// Get payment methods
router.post("/getPaymentMethods", async (req, res) => {
  try {
    const response = await checkout.paymentMethods({
      channel: "Web",
      merchantAccount: process.env.MERCHANT_ACCOUNT,
    });
    res.json(response);
  } catch (err) {
    console.error(`Error: ${err.message}, error code: ${err.errorCode}`);
    res.status(err.statusCode).json(err.message);
  }
});

module.exports = router;