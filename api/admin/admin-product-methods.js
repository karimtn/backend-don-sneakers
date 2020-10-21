const router = require("express").Router();
const product = require("../../models/products");
const multer = require("multer")
const checkAuth = require("../routes-protector")

// # IMAGE UPLOAD CONFIGURATION #
const storage = multer.diskStorage({
  destination:  (req,file,cb) => {
  cb(null,"assets/product-images")
  },

  filename: (req,file,cb) => {
  cb(null, `${new Date().toISOString()} ${file.originalname}`)
  }
})

const upload = multer({storage})
// ###############################

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
router.post("/new-product",checkAuth, upload.single('productImage'), async (req, res) => {
  try {
    console.log(req.file)
    const { name, description, price, quantity, tax } = req.body
    const newProduct = await new product({
      name,
      description,
      image: req.file.path,
      price,
      quantity,
      tax
    }).save();
    res.status(201).send(newProduct);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// # EDIT A PRODUCT #
router.put("/edit-product/:id", checkAuth, async (req, res) => {
  try {
    const productEdited = await product.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send(productEdited);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// # DELETE A PRODUCT #
router.delete("/delete-product/:id", checkAuth, async (req, res) => {
  try {
    await product.findByIdAndDelete(req.params.id);
    res.status(204).send("product deleted successfully");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
