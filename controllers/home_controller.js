const Product = require("../models/product");
const User = require("../models/user");

const billMailer = require("../mailers/bill_mailer");

// renders home page
module.exports.home = async function (req, res, next) {
  var womenProducts = await Product.find({ category: "women" });
  var menProducts = await Product.find({ category: "men" });
  var furnitureProducts = await Product.find({ category: "furniture" });
  // console.log(">>> wommen products ", womenProducts);
  return res.render("home", {
    title: "Shop Now",
    menProducts,
    womenProducts,
    furnitureProducts,
  });
};

module.exports.cart = function (req, res, next) {
  User.findById({ _id: req.user.id }, async function (err, user) {
    var product_ids = user.products;
    var cartItems = [];
    var itemCount = product_ids.length;
    var totPrice = 0;
    for (let i = 0; i < product_ids.length; i++) {
      let product = await Product.findById({ _id: product_ids[i] });
      totPrice += product.price;
      cartItems.push(product);
    }
    // console.log(">> cart Items.. ", cartItems);

    return res.render("cart", {
      title: "Shop Now",
      cartItems,
      itemCount,
      totPrice,
    });
  });
};
module.exports.addToCart = function (req, res, next) {
  console.log(">>> ", req.user.id);
  User.findByIdAndUpdate(
    { _id: req.user.id },
    { $push: { products: req.params.id } },
    function (err, user) {
      console.log(">>> Update user details ", user);
      return res.redirect("/cart");
    }
  );
};
module.exports.removeFromCart = function (req, res, next) {
  console.log(">>> ", req.user.id);
  User.findByIdAndUpdate(
    { _id: req.user.id },
    { $pull: { products: req.params.id } },
    function (err, user) {
      console.log(">>> Update user details ", user);
      return res.redirect("/cart");
    }
  );
};

module.exports.purchase = function (req, res, next) {
  User.findById({ _id: req.user.id }, async function (err, user) {
    var product_ids = user.products;
    var cartItems = [];
    var itemCount = product_ids.length;
    var totPrice = 0;
    for (let i = 0; i < product_ids.length; i++) {
      let product = await Product.findById({ _id: product_ids[i] });
      totPrice += product.price;
      cartItems.push(product);
    }
    // console.log(">> cart Items.. ", cartItems);

    var orderDetails = {
      products: cartItems,
      totPrice: totPrice,
      userName: user.name,
      userMailid: user.email,
      userPhone: user.Number
    };
    console.log(">>> Order Details : ", orderDetails);
    billMailer.newOrder(orderDetails);

    return res.redirect("back");
  });
};
