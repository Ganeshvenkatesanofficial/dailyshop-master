var express = require("express");
var router = express.Router();
var passport = require("passport");

const paymentModel = require("../models/payment_details");
const Razorpay = require("razorpay");
var instance = new Razorpay({
  key_id: "rzp_test_bj7spSpeQI6wuR",
  key_secret: "eYWJjmJTZ2aW5K5OVqUuIQSK",
});

var homeController = require("../controllers/home_controller");
var userController = require("../controllers/users_controller");

/* GET home page. */
router.get("/", homeController.home);
router.get("/cart", passport.checkAuthentication, homeController.cart);
router.get(
  "/cart/add/:id",
  passport.checkAuthentication,
  homeController.addToCart
);
router.get(
  "/cart/remove/:id",
  passport.checkAuthentication,
  homeController.removeFromCart
);
router.get("/sign-up", userController.signUp);
router.get("/purchase", passport.checkAuthentication, homeController.purchase);
router.use("/users", require("./user"));
router.use("/product", require("./product"));

router.post("/payment", require("body-parser").json(), function (req, res) {
  //creating a id for order id using amount alone
  console.log("inside payment");
  paymentModel.create({ amount: req.body.amount }).then(
    function (success) {
      console.log("amount inserted into payment_details successfully");
      // res.send(success)

      //razorpay integration
      var options = {
        amount: req.body.amount * 100, // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_" + success._id,
      };
      instance.orders.create(options, function (err, order) {
        if (err) console.log(err);

        paymentModel
          .findByIdAndUpdate(
            { _id: success._id },
            { paymentid: order.id, orderid: order.receipt }
          )
          .then(
            (success) => {
              console.log(req.body);
              res.send({ status: true, order: order });
              //participateModel.create({ person_id: req.body.email, competition_id: req.body.competition_id }).then((success) => res.send({ status: true, order: order }), (fail) => { console.log('participate Model create is getting error');
              // res.send({ status: false })})
            },
            (fail) => {
              console.log("paymentModel findBy is getting error");
              res.send({ status: false });
            }
          );
      });
    },
    function (fail) {
      console.log("Error while insertion");
      res.send({ error: "Error while insertion" });
    }
  );
});

module.exports = router;
