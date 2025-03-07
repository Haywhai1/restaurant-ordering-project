const express = require("express");
const userController = require("../controller/user.controller");
const router = express.Router();

const { authentication } = require("../middleware/auth");


router.post("/register", userController.register)
router.post("/login", userController.login)
router.get("/currentUser", authentication, userController.getCurrentUser)


module.exports = router;