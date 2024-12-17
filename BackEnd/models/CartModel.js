const mongoose = require("mongoose");

const Cart = mongoose.model({
  ProductId: [{ type: mongoose.Schema.Types.ObjectId }],
});

module.exports = Cart;
