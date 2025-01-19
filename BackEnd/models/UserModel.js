const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  profilePic: { type: String },
  IsAdmin: { type: Boolean, default: false },
  address: [
    {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: String },
      landmark: { type: String },
    },
  ],
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
      qty: { type: Number },
      price: { type: Number },
      size: { type: String },
      color: { type: String },
    },
  ],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Orders" }],
  updatedOn: { type: Date, default: Date.now },
  createdOn: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
