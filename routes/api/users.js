const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

//Load user model to check if email exists
const User = require("../../models/User");

//@route   GET api/users/test
//@desc    Tests users route
//@access  Public
router.get("/test", (req, res) => res.json({ msg: "users Works" }));

//@route   GET api/users/test
//@desc    Tests users route
//@access  Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "email already exists" });
    } else {
      //destructuring req.body
      const { name, email, password } = req.body;
      //creating the avatar picture with gravatar
      const avatar = gravatar.url(email, {
        s: "200", //Size
        r: "pg", //Rating
        d: "mm" //Default
      });
      //creating new User
      const newUser = new User({
        name,
        email,
        avatar, // from gravatar
        password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
