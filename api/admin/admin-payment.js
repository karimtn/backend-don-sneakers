const router = require("express").Router();
const easyinvoice = require("easyinvoice");
const user = require("../../models/users");
const product = require("../../models/products");
const selledProduct = require("../../models/selledProduct");
const fs = require("fs");
let number = 0

router.post("/create-payment-intent/:user_id/:product_id", async (req, res) => {
  try {
    const { user_id, product_id } = req.params;
    const userInfo = await user.findById(user_id);
    const productInfo = await product.findById(product_id);
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    today = mm + "-" + dd + "-" + yyyy;
    let data = {
      currency: "EUR",
      taxNotation: "vat",
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,
      logo:
        "https://www.snupps.com/api/2.10/users/355355/avatar/355355.400.jpg",

      sender: {
        company: "Sneaker Don",
        address: "Rue Guynemer, 38",
        zip: "75006",
        city: "Paris",
        country: "France",
      },
      client: {
        company: `${userInfo.firstName} ${userInfo.lastName}`.toUpperCase(),
        address: `${userInfo.address}`,
        zip: `${userInfo.postalCode}`,
        city: `${userInfo.city}`,
        country: `${userInfo.country}`,
      },
      invoiceNumber: "",
      invoiceDate: today,
      products: [
        {
          quantity: req.body.quantity,
          description: productInfo.name,
          tax: productInfo.tax,
          price: productInfo.price,
        },
      ],
    };
    
    const result = await easyinvoice.createInvoice(data);
    await fs.writeFileSync(
       `#${number} ${userInfo.firstName} ${userInfo.lastName} ${today}.pdf`,
      result.pdf,
      "base64"
    );
    number += 1

    await new selledProduct({
      userMail: userInfo.email,
      productName: productInfo.name,
      price: productInfo.price,
      quantity: req.body.quantity,
      total: productInfo.price * req.body.quantity,
    }).save();

    res.json("shipping info saved in the db");
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

module.exports = router;
