const router = require("express").Router();
const bcrypt = require('bcrypt')
const admin = require("../../models/admin");

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, passwordConfirmation } = req.body;
    const emailRegistered = await admin.findOne({ email });
    console.log('1',password.length)
    console.log('2',password === passwordConfirmation)
    console.log('3',password.length >= 6 )
    if (!emailRegistered && password.length >= 6 && password === passwordConfirmation) {
      const newAdmin = new admin({
        firstName,
        lastName,
        email,
        password,
        resetPasswordToken: "",
        resetPasswordExpires: 0,
      });
      bcrypt.hash(newAdmin.password, 10, async (req, res) => {
        await newAdmin.save();
        res.status(201).send("user registered done");
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
