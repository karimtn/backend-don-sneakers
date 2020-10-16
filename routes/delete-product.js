const router = require("express").Router();
const product = require("../models/products");

module.exports = router.delete("/delete-product/:id", async (req, res) => {
  try {
    const productDeleted = await product.findByIdAndDelete(req.params.id);
    console.log(productDeleted);
    res.status(204).send("product deleted successfully", productDeleted);
  } catch (error) {
    console.log(error);
    res.status(404).send("can't delete product not found");
  }
});
