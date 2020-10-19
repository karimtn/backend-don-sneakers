const router = require("express").Router();
const user = require("../../models/users");

router.delete("/delete-user/:id", async (req, res) => {
  try {
    const userDeleted = await user.findByIdAndDelete(req.params.id);
    res.status(204).send(userDeleted);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
