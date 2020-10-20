const express = require("express");
const router = require("express").Router();
const easyinvoice = require("easyinvoice");
const product = require("../../models/products");

router.post("/test/:id", async (req, res) => {
  try {
      await product.findById({})
    var data = {
      //"documentTitle": "RECEIPT", //Defaults to INVOICE
      currency: "EUR",
      taxNotation: "vat", //or gst
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,
      logo:
        "https://pbs.twimg.com/profile_images/924738757118582784/U1zFEwPt_400x400.jpg", //or base64
      //"logoExtension": "png", //only when logo is base64
      sender: {
        company: "Don Sneakers",
        address: "where ever",
        zip: "where ever",
        city: "Sampletown",
        country: "Tunisia",
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
      },
      client: {
        company: "req.body.name",
        address: "req.body.adsress",
        zip: "req.body.zip",
        city: "req.body.city",
        country: "req.body.country",
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
      },
      invoiceNumber: "2020.0001",
      invoiceDate: "Date.now()",
      products: [
        {
          quantity: "2",
          description: "Test1",
          tax: 6,
          price: 33.87,
        },
        {
          quantity: "4",
          description: "Test2",
          tax: 21,
          price: 10.45,
        },
      ],
    };
    //Create your invoice! Easy!
    const result = await easyinvoice.createInvoice(data);
    await fs.writeFileSync("invoice.pdf", result.pdf, "base64");
  
} catch(error) {
      res.send(error)
      console.log(error)
  }
});
