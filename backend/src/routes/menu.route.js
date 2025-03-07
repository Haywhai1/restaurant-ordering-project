const express = require("express");
const menuController = require("../controller/menu.controller");
const router = express.Router();
const { authentication, userRole } = require("../middleware/auth");


router
  .route("/")
  .get(menuController.getAllMenu)
  .post(authentication, userRole(["admin"]), menuController.createMenu)
  
router
  .route("/:id")
  .get(menuController.getMenuById)
  .patch( authentication, userRole(["admin"]), menuController.updateMenu)
  .delete(authentication, userRole(["admin"]), menuController.deleteMenu); 

module.exports = router;
