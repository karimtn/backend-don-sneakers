const router = require("express").Router();
const product = require("../../models/products");

// # GET THE LIST OF ALL THE PRODUCTS #
router.get("/all-products", async (req, res) => {
  try {
    const productList = await product.find({});
    res.send(productList);
  } catch (error) {
    console.log(error);
    res.send(error);

  }
});

// # ADD A NEW PRODUCT #
router.post("/new-product", async (req, res) => {
  try {
    const newProduct = await new product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
    }).save();
    res.status(201).send(newProduct);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// # EDIT A PRODUCT #
router.put("/edit-product/:id", async (req, res) => {
  try {
    const productEdited = await product.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send(productEdited);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// # DELETE A PRODUCT #
router.delete("/delete-product/:id", async (req, res) => {
  try {
    const productDeleted = await product.findByIdAndDelete(req.params.id);
    res.status(204).send(productDeleted);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
