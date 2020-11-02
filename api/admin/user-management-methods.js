const router = require("express").Router();
const checkAuth = require("../routes-protector")
const user = require("../../models/users");


router.get("user-list", async (req, res) => {
  try{
    const userList = await user.find({})
    console.log(userList)
    res.send(userList)
  } catch(error) {
    console.log(error)
    res.json(error)
  }
})

// # DELETE A USER #
router.delete("/delete-user/:id", async (req, res) => {
  try {
    await user.findByIdAndDelete(req.params.id);
    res.status(204).send("user deleted successfully");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
