const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OtpSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    index: true,
    trim: true,
    unique: true,
    sparse: true,
  },
  phone: {
    type: String,
    index: true,
    trim: true,
    unique: true,
    sparse: true,
  },
  otp: String,
  type: String, // forgotPassword or verification
  createdAt: Date,
  expiredAt: Date,
});

const Otp = mongoose.models.Otp || mongoose.model("Otp", OtpSchema);

module.exports = Otp;
