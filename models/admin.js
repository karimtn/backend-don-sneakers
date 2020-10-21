const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
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
    minlength: 6
  },
  passwordConfirmation: {
    type: String,
    minlength: 6
  },
  role: {
    type: String
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Number,
  }
});

module.exports = mongoose.model("admin", adminSchema);
