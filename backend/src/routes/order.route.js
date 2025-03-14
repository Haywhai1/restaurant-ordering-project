// src/routes/order.route.js
const express = require('express');
const router = express.Router();
const orderController = require('../controller/order.controller');  
const { authentication } = require("../middleware/auth");



router.post('/addOrder', orderController.addOrder); 
router.get("/:userId", orderController.getUserOrder);  
router.delete("/:orderId", authentication, orderController.deleteOrder);

module.exports = router;  
