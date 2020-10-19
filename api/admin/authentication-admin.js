const router = require("express").Router();
const bcrypt = require('bcrypt')
const admin = require("../../models/admin");

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, passwordConfirmation } = req.body;
    const emailRegistered = await admin.findOne({ email });
    console.log('first log',password)
    
    if (!emailRegistered && password.length >= 6 && password === passwordConfirmation) {
      const newAdmin = new admin({
        firstName,
        lastName,
        email,
        password,
        resetPasswordToken: "",
        resetPasswordExpires: 0,
      })
      
      console.log('before bcrypt', newAdmin.password)

      bcrypt.hash(newAdmin.password, 10, async (err,hash) => {
        console.log('hash',hash)
        await newAdmin.save();
        // console.log("hashedpass",newAdmin)
      })
      res.json(newAdmin)
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
