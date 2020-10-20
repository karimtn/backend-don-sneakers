const router = require("express").Router();
const easyinvoice = require('easyinvoice');
const user = require("../../models/users");
const product = require("../../models/products");
const selledProduct = require("../../models/selledProduct");
const fs = require("fs")

router.post("/after/:user_id/:product_id", async (req, res) => {
  try {
    const {user_id, product_id} = req.params 
    const userInfo = await user.findById(user_id);
    const productInfo = await product.findById(product_id);
    let today = new Date();
    const dd = String(today. getDate()). padStart(2, '0');
    const mm = String(today. getMonth() + 1). padStart(2, '0'); //January is 0!
    const yyyy = today. getFullYear();
    today = ( mm + '/' + dd + '/' + yyyy );
    let data = {
        "currency": "EUR",
        "taxNotation": "vat", //or gst
        "marginTop": 25,
        "marginRight": 25,
        "marginLeft": 25,
        "marginBottom": 25,
        "logo": "https://www.snupps.com/api/2.10/users/355355/avatar/355355.400.jpg", //or base64
        //"logoExtension": "png", //only when logo is base64
        "sender": {
            "company": "Sneaker Don",
            "address": "....",
            "zip": "45484aa",
            "city": "Lyon",
            "country": "France"
        
        },
        "client": {
               "address": "no need for now",
               "zip": `${userInfo.zipCode}`,
               "city": `${userInfo.city}`,
               "country": `${userInfo.country}`
        },
        "invoiceNumber": "2020.0001",
        "invoiceDate": today,
        "products": [
            {
                "quantity": productInfo.quantity,
                "description": productInfo.description,
                "price": productInfo.total
            },
        ],
        "bottomNotice": "Kindly pay your invoice within 15 days."
    };
     
    const result = await easyinvoice.createInvoice(data);                       
    await fs.writeFileSync("invoice.pdf", result.pdf, 'base64');
    console.log(result)

    const omar = await new selledProduct({
      userMail: userInfo.email,
      productName: productInfo.name,
      price: productInfo.price,
      quantity: req.body.quantity,
      total: productInfo.price * req.body.quantity,
      invoice: result
    }).save();
    
    res.json(omar)

  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

module.exports = router