const router = require("express").Router();
const bcrypt = require("bcrypt");
const user = require("../../models/users");

router.post("/register", async (req, res) => {
  try {
    let { firstName, lastName, email, password, passwordConfirmation, dateOfBirth } = req.body;

    const emailRegistered = await user.findOne({ email });

    if (emailRegistered) {
      res.send("your email already exist");
    }

    if (password.length < 6) {
      res.send("your password length should be more than 6 please ");
    }

    if (password !== passwordConfirmation) {
      res.send(
        "your password and your password confirmation are not equal try again"
      );
    } else {
      let newUser = new user({
        firstName,
        lastName,
        email,
        password,
        dateOfBirth,
        resetPasswordToken: "",
        resetPasswordExpires: 0,
      });

      bcrypt.hash(newUser.password, 10, (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          newUser.password = hash;
        }
      });

      await newUser.save();
      res.status(201).send("new user created");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
