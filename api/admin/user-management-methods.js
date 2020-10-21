const router = require("express").Router();
const checkAuth = require("../routes-protector")
const user = require("../../models/users");

// # DELETE A USER #
router.delete("/delete-user/:id", checkAuth, async (req, res) => {
  try {
    await user.findByIdAndDelete(req.params.id);
    res.status(204).send("user deleted successfully");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
