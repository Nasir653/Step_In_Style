const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  profilePic: { type: String },
  IsAdmin: { type: Boolean, default: false },
  address: { type: String },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Orders" }],
  updatedOn: { type: Date, default: Date.now },
  createdOn: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
