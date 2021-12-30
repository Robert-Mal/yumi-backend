const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login?error=login",
  })
);

router.post("/register", (req, res, next) => {
  const { email, fullName, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      res.redirect("/login?error=server");
    } else {
      const newUser = new User({
        email: email,
        fullName: fullName,
        password: hash,
      });

      newUser.save().then((user) => console.log(user));

      res.redirect("/login");
    }
  });
});

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .json({ msg: "You are not authorized to view this resource" });
  }
};

router.get("/protected-route", isAuth, (req, res, next) => {
  res.send("You made it to the route.");
});

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
