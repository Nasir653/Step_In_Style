const mongoose = require("mongoose");

const Orders = mongoose.model("Orders", {
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      qty: { type: Number, required: true },
      price: { type: Number },
      size: { type: String },
      color: { type: String },
    },
  ],
  address: [
    {
      fullName: String,
      street: String,
      city: String,
      district: String,
      state: String,
      pincode: String,
      landmark: String,
      contact: String,
    },
  ],
  totalAmount: { type: Number },
  shippingTime: {
    type: Date,
    default: () => new Date(new Date().setDate(new Date().getDate() + 7)),
  },
  emailVerified: { type: Boolean, default: false },
  isPaymentDone: { type: Boolean, default: false },
  OrderDate: { type: Date, default: Date.now() },
  updatedOn: { type: Date, default: Date.now() },
});

module.exports = { Orders };
