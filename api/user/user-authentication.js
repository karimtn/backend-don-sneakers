const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../../models/users");

router.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation,
      phoneNumber,
      dateOfBirth,
      country,
      city,
      address,
      postalCode,
    } = req.body;

    const emailRegistered = await user.findOne({ email });
    const phoneNumberRegistered = await user.findOne({ phoneNumber });

    if (emailRegistered) {
      res.send("your email already exist");
    }

    if (phoneNumberRegistered) {
      res.send("your phone number is already linked to another account please chose another one")
    }

    if (password !== passwordConfirmation) {
      res.send(
        "your password and your password confirmation are not equal try again"
      );
    } 

    if (!emailRegistered && !phoneNumberRegistered && password === passwordConfirmation) {
      let newUser = new user({
        firstName,
        lastName,
        email,
        password,
        dateOfBirth,
        phoneNumber,
        country,
        city,
        address,
        postalCode,
        dateOfBirth,
        role: "user",
        resetPasswordToken: "",
        resetPasswordExpires: 0,
      });

      bcrypt.hash(newUser.password, 10, async (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          newUser.password = hash;
          await newUser.save();
        }
      });
      res.status(201).send("new user created");
    } 
  } catch (error) {
    console.log(error);
    res.send("error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { _id, email, password } = req.body;
    const userInfo = await user.findOne({ email });
    if (userInfo) {
      bcrypt.compare(password, userInfo.password, (err, result) => {
        if (err) {
          res.send("Auth failed");
          console.log("auth failed");
        }

        if (result) {
          const token = jwt.sign({ email, _id }, process.env.JWT_KEY, {
            expiresIn: "24h",
          });
          res.json(token);
        }
      });
    } else {
      res.send("user by this email doesent exist");
    }
  } catch (error) {
    res.send("error");
    console.log(error);
  }
});

module.exports = router;
