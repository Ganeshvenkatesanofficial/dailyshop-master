const Product = require("../models/product");

module.exports.product = function (req, res) {
  return res.render("create-product", {
    title: "Daily Shop | product",
  });
};

module.exports.create = function (req, res) {
  console.log(">>> ", req.body);
  Product.create(
        {
          title: req.body.title,
          img_url: req.body.img_url,
          category: req.body.category,
          price: req.body.price
        },
    // req.body,
    function (err, product) {
      if (err) {
        console.log("Error: " + err);
      }
      console.log("Product added: " + product);
      return res.redirect("/");
    }
  );
};
