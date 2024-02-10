var express = require('express');
var router = express.Router();
const passport = require("passport");

var productController = require("../controllers/product_controller");

router.get("/", passport.checkAuthentication, productController.product);
router.post("/create", passport.checkAuthentication, productController.create);

module.exports = router;