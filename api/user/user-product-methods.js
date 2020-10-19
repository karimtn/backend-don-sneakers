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

// # GET ALL THE INFO OF A SPECIFIC PRODUCT #
router.get("/product/:id", async (req, res) => {
  try {
    const productInfo = await product.findById(req.params.id);
    res.send(productInfo);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router 