const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  fullName: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("admins", adminSchema);
