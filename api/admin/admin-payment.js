const router = require("express").Router();
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const easyinvoice = require("easyinvoice");
const nodeMailer = require("nodemailer")
const checkAuth = require("../routes-protector")
const user = require("../../models/users");
const product = require("../../models/products");
const selledProduct = require("../../models/selledProduct");
const fs = require("fs");
require("dotenv").config();
let number = 0;

router.post("/create-payment-intent/:user_id/:product_id", async (req, res) => {
  try {
    const { user_id, product_id } = req.params;
    const userInfo = await user.findById(user_id);
    const productInfo = await product.findById(product_id);

    let total = productInfo.price * req.body.quantity
   
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: total,
    //   currency: "usd",
    // });

    // const client_secret = paymentIntent.client_secret;
    // res.send({
    //   clientSecret: client_secret,
    //   price: productInfo.price,
    //   quantity: req.body.quantity,
    //   total: total,
    // });

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    today = mm + "-" + dd + "-" + yyyy;
    number += 1;

    let pdfName = `#${number} ${userInfo.firstName} ${userInfo.lastName} ${today}.pdf`;
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
      invoiceNumber: number,
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
    await fs.writeFileSync(`assets/pdf-invoices/${pdfName}`, result.pdf, "base64");

    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: userInfo.email,
      subject: "payment status",
      text: `Thanks for your purchase`,
      attachments : [
        { fileName : pdfName , path: `assets/pdf-invoices/${pdfName}`}
      ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
      } else {
       console.log(`Email sent : ${info.response}`);
      }
    });

    await new selledProduct({
      userMail: userInfo.email,
      productName: productInfo.name,
      price: productInfo.price,
      quantity: req.body.quantity,
      total: total,
    }).save();

    res.json("shipping info saved in the db");
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

module.exports = router;
