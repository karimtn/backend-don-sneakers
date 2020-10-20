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
    type: Number,
  },
  quantity: {
    type: Number,
  },
  tax:{
    type:Number,
    required: true
  }
});

module.exports = mongoose.model("products", productSchema);
