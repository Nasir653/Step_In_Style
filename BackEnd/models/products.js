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
    enum: ["New Collection", "Trending", "None"],
    default: null,
  },
  type: {
    type: String,
    enum: ["Shirts", "T-Shirts", "Jeans", "Shoes", "Kurtas"],
    default: null,
  },

  sizes: String,
  colors: String,
  price: Number,
  discount: Number,
  qty: Number,
  rating: { type: Number, default: 0 },
  reviews: [
    {
      user: {
        type: moongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      review: { type: String },
      star: { type: Number },
    },
  ],
});

module.exports = Products;
