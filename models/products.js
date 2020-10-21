const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
    unique: true,
  },
  price: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
  },
  tax:{
    type:String,
    required: true
  }
});

module.exports = mongoose.model("products", productSchema);
