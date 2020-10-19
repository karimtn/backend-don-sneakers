const router = require("express").Router();
const bcrypt = require('bcrypt')
const admin = require("../../models/admin");

router.post("/register", async (req, res) => {
  try {
    let { firstName, lastName, email, password, passwordConfirmation } = req.body;
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
      
      bcrypt.hash(newAdmin.password, 10, (err,hash) => {
        if (err) {
          console.log(err)
        } else {
          newAdmin.password = hash
          }
      })

      await newAdmin.save()
      res.status(201).send('new admin created')
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
