const router = require("express").Router();
const user = require("../../models/users");
const product = require("../../models/products");
const selledProduct = require("../../models/selledProduct");

router.post("/after/:user_id/:product_id", async (req, res) => {
  try {
    const {user_id, product_id} = req.params 
    const userInfo = await user.findById(user_id);
    const productInfo = await product.findById(product_id);
    const omar = await new selledProduct({
      userMail: userInfo.email,
      productName: productInfo.name,
      price: productInfo.price,
      quantity: req.body.quantity,
      total: productInfo.price * req.body.quantity,
    }).save();
    console.log('omar here',omar)
    res.json(omar);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

module.exports = router