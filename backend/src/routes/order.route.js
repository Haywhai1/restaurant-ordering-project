// src/routes/order.route.js
const express = require('express');
const router = express.Router();
const orderController = require('../controller/order.controller');  


router.post('/addOrder', orderController.addOrder); 
router.get("/:userId", orderController.getUserOrder);  

module.exports = router;  
