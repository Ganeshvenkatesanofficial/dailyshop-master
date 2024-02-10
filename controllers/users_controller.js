const User = require("../models/user");

module.exports.profile = function (req, res) {
  // return res.end('<h1>Users profile</h1>')
  User.findById(req.params.id, function (err, user) {
    return res.render("user_profile", {
      title: "users-profile",
      profile_user: user,
    });
  });
};

// render sign up page
module.exports.signUp = function (req, res) {
  // if (req.isAuthenticated()) {
  //   return res.redirect("/users/profile");
  // }

  return res.render("register", {
    title: "Daily Shop | sign-up",
  });
};

// render sign in page
module.exports.signIn = function (req, res) {
  // if (req.isAuthenticated()) {
  //   return res.redirect("/users/profile");
  // }

  return res.render("user_sign_in", {
    title: "Daily Shop | sign-in",
  });
};

// get the sign up data
module.exports.create = function (req, res) {
  // if (req.body.password != req.body.confirm_password) {
  //   return res.redirect("back");
  // }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding user in signing up");
      return;
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error in creating user in signing up");
          return;
        }
        console.log("User created: ", user);
        return res.redirect("/");
      });
    } else {
      return res.redirect("back");
    }
  });
};

// sign in  and create a session for user
module.exports.createSession = function (req, res) {
  // req.flash("success", "logged in successfully");
  console.log("Logged in successfully");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout();
  // req.flash("success", "You have logged out");
  console.log("Logged Out successfully");
  return res.redirect("/");
};
