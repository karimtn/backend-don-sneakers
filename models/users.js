const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  phoneNumber: {
    type: String,
    unique: true,
  },
  dateOfBirth: {
    type: String,
  },
});

module.exports = mongoose.model("users", userSchema);
