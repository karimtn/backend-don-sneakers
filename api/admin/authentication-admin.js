const router = require("express").Router();
const admin = require("../../models/admin");

router.post("/admin-register", async (req, res) => {
  try {
    const { email, password, passwordConfirmation } = req.body;
    const emailRegistred = await admin.find({ email });
    if (!emailRegistred && password === passwordConfirmation) {
      const newAdmin = new admin({
        firstName,
        lastName,
        email,
        password,
      });
      await bcrypt.hash(newAdmin.password, 10, async (req, res) => {
        await newAdmin.save();
        res.status(201).send(newAdmin);
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router
