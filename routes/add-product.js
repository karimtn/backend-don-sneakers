const router = require("express").Router();
const product = require("../models/products");

module.exports = router.post("/new-product", async(req, res) => {
  try {
    await new product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
    }).save();
    res.status(201).send("product saved");
  } catch (error) {
    res.status(406).send("error");
    console.log(error);
  }
});
