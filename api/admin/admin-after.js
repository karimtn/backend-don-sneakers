const router = require("express").Router();
const user = require("../../models/users");
const product = require("../../models/products");
const selledProduct = require("../../models/selledProduct");

router.post("/after/:user-id/:product-id", async (req, res) => {
  try {
    const { product_id, user_id } = req.params;
    const usersInfo = user.findById({ user_id });
    const productInfo = product.findById({ product_id });
    const omar = await new selledProduct({
      name: usersInfo.email,
      productName: productInfo.name,
      price: productInfo.price,
      quantity: req.body.quantity,
      total: productInfo.price * req.body.quantity,
    }).save();
    res.json(omar);
  } catch (error) {
    res.send(error);
    console.log(erro);
  }
});
