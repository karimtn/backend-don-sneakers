const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  passwordConfirmation: {
    type: String
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  dateOfBirth: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Number,
  },
});

module.exports = mongoose.model("users", userSchema);
