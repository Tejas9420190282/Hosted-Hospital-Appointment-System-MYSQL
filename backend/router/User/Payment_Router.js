
// payment_Router.js (Node)

const express = require('express');

const { payment_Controller, createRazorpayOrder } = require('../../Controller/User_Controller/Payment_Controller');

const payment_Router = express.Router();

payment_Router.post("/payment", payment_Controller);

payment_Router.post("/create-razorpay-order", createRazorpayOrder);

exports.payment_Router = payment_Router;





