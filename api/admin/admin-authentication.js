const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const admin = require("../../models/admin");

router.post("/register", async (req, res) => {
  try {
    let { firstName, lastName, email, password, passwordConfirmation } = req.body;
    const emailRegistered = await admin.findOne({ email });

    if (emailRegistered) {
      res.send("your email already exist");
    }

    if (password.length < 6) {
      res.send("your password length should be more than 6 please ");
    }

    if (password !== passwordConfirmation) {
      res.send("your password and your password confirmation are not equal try again");
    } else {
      const newAdmin = new admin({
        firstName,
        lastName,
        email,
        password,
        resetPasswordToken: "",
        resetPasswordExpires: 0,
      });

      bcrypt.hash(newAdmin.password, 10, (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          newAdmin.password = hash;
        }
      });

      await newAdmin.save();
      res.status(201).send("new admin created");
    }

  } catch (error) {
    console.log(error);
    res.send(error)
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const adminAccount = await admin.findOne({ email });
  console.log(adminAccount)
  if (adminAccount) {
    console.log('before bcrypt')
     bcrypt.compare(password, adminAccount.password, (err, res) => {
      console.log('inside bcrypt', res);
      if (res) {
        console.log('succ')
        res.send("Auth succ");
      }
      
      if (err) {
        console.log(err);
        res.send("Auth failed");
      }
    });
  } else {
    console.log('not exist')
    res.send("admin doesent exist");
  }
});


module.exports = router;
