const moongoose = require("mongoose");

const Products = moongoose.model("Products", {
  title: { type: String },
  details: { type: String },
  price: { type: String },
  imageUrl: { type: String },
  category: {
    type: String,
    enum: ["Mens", "Womens", "Kids"],
    default: null,
  },

  subCategory: {
    type: String,
    enum: ["New Collection", "Trending"],
    default: null,
  },
  type: {
    type: String,
    enum: ["Shirts", "T-Shirts", "Jeans", "Shoes", "Kurtas"],
    default: null,
  },
});

module.exports = Products;
