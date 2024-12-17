const mongoose = require("mongoose");

const User = mongoose.model("Register", {
  username: { type: String },
  email: { type: String },
  password: { type: String },
  phone: { type: String },
  adress: { type: String },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId }],
  upatedOn: { type: Date, default: Date.now() },
});

module.exports = User;
