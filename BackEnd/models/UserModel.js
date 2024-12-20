const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: { type: String },
  email: { type: String },
  password: { type: String },
  phone: { type: String },
  profilePic: { type: String },
  adress: { type: String },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId }],
  upatedOn: { type: Date, default: Date.now() },
});

module.exports = User;
