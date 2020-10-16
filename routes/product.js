const router = require("express").Router();
const product = require("../models/products");

router.post("/new-product", async (req, res) => {
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

router.delete("/delete-product/:id", async (req, res) => {
  try {
    await product.findByIdAndDelete(req.params.id);
    res.status(204).send("product deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(404).send("can't delete product not found");
  }
});

router.put("/edit-product/:id", async (req,res) => {
  try {
    await product.findByIdAndUpdate(req.params.id,req.body);
    res.send(req.body)
  } catch(error) {
    console.log(error)
  }
});

module.exports = router;
