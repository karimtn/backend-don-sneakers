const router = require("express").Router();
const bcrypt = require('bcrypt')
const admin = require("../../models/admin");

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, passwordConfirmation } = req.body;
    const emailRegistered = await admin.findOne({ email });
    
    if (!emailRegistered && password.length >= 6 && password === passwordConfirmation) {
      const passwordHashed = await bcrypt.hash(password, 10, async(req,res) => {
        const newAdmin = new admin({
        firstName,
        lastName,
        email,
        password:passwordHashed,
        resetPasswordToken: "",
        resetPasswordExpires: 0,
      })
      await newAdmin.save();
      console.log("hashedpass",passwordHashed)
      })
      res.json(newAdmin)
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
