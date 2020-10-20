const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const selledProductSchema = new Schema({
  userMail: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  invoice: {
    type: Schema.Types.Mixed,
    require:true
  },
});

module.exports = mongoose.model("selledProduct",selledProductSchema)