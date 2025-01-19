const mongoose = require("mongoose");

const Orders = mongoose.model("Orders", {
  productId: { type: mongoose.Schema.Types.ObjectId },
  ordercost: { type: Number },
  size: { type: String },
  color: { type: String },
  quntity: { type: Number },
  orderStatus: {
    type: String,
    enum: ["completed", "pending", "cancelled", "refunded", "inTransit"],
    default: "pending",
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdOn: { type: Date, default: Date.now() },
  updatedOn: { type: Date, default: Date.now() },
});

module.exports = { Orders };
