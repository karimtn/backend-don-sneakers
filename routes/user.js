const router = require("express").Router();
const user = require("../models/users");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordConfirmation, phoneNumber } = req.body;

    const emailRegistred = await user.findOne({email});
    const phoneNumberRegistred = await user.findOne({phoneNumber});

    if (
      password <= 6 &&
      password === passwordConfirmation &&
      !phoneNumberRegistred &&
      !emailRegistred
    ) {
      let newUser = new user({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        dateOfBirth,
        resetPasswordToken: "",
        resetPasswordExpires: 0,
      });

      await bcrypt.hash(newUser.password, 10, async (req, res) => {
        await newUser.save();
        res.status(201).send(newUser);
      });
    }
  } catch (error) {
    console.log(error);
    res.send("error");
  }
});

module.exports = router;
