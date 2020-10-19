const router = require("express").Router()
const nodeMailer = require("nodemailer")
const bcrypt = require("bcrypt")
const crypto = require("crypto") 
const user = require("../../models/users")
require("dotenv").config()

router.post("/reset-password", async (req, res) => {
    try {
      const { email } = req.body;
      if (email === "") throw new Error("email required");
      const userInfo = await user.findOne({ email });
      if (userInfo === null) {
        console.error("email is not found in the db");
        throw new Error("email not found in the db");
      }
      userInfo.resetPasswordToken = crypto.randomBytes(20).toString("hex");
      userInfo.resetPasswordExpires = Date.now() + 3600000;
      await user.save();
  
      const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_ADRESS,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_ADRESS,
        to: email,
        subject: "Don-Sneaker is helping you to reset your password!",
        text: `To set your new password please
               click here : https://localhost:8081/${userInfo.resetPasswordToken}`,
      };
  
      await transporter.sendMail(mailOptions);
      return res.status(200).json("recovery email sent");
    } catch (error) {
      console.error(error);
      return res.status(403).json(error);
    }
  });
  
  router.post("/reset-password/:token", async (req, res) => {
    try {
      const { confirmedPassword } = req.body
      const userInfo = await user.findOne({
        resetPasswordToken: req.params.token,
      });
      if (!userInfo) throw new Error("invalid token");
      if (userInfo.resetPasswordExpires < Date.now()) {
        userInfo.resetPasswordToken = "";
        userInfo.resetPasswordExpires = 0;
        await user.save();
        throw new Error("token expired");
      }
      userInfo.resetPasswordToken = "";
      userInfo.resetPasswordExpires = 0;
      userInfo.password = await bcrypt.hash(
        confirmedPassword,
        await bcrypt.genSalt(10)
      );
      await user.save();
      return res.send("new password setted");
    } catch (error) {
      console.log(error);
    }
  });
  
  module.exports = router