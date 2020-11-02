const router = require("express").Router();
const selledProducts = require("../../models/selledProduct");

router.get("selled-product-list", async (req, res) => {
  try {
    const list = await selledProducts.find({});
    res.json({ message: "list of selled products", list });
  } catch(error) {
      res.json(error)
      console.log(error)
  }
});

module.exports = router