const mongoose = require("mongoose");

const Products = mongoose.model("Products", {
  title: { type: String, required: true },
  details: { type: String },
  price: { type: Number, required: true },
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
    enum: [
      "Shirts",
      "T-Shirts",
      "Jeans",
      "Shoes",
      "Kurtas",
      "HandBags",
      "Dresses",
      "Flats&Shoes",
    ],
    default: null,
  },
  occasion: {
    type: String,
    enum: [
      "Casual",
      "Formal",
      "Party",
      "FootWear",
      "Wedding",
      "Festive",
      "Sports",
      "Loungewear",
      "Ethnic",
      "Winter",
      "Summer",
      "Travel",
      "Nightwear",
      "Workwear",
    ],
    default: "Casual",
  },
  sizes: String,
  colors: String,
  discount: Number,
  qty: Number,
  rating: { type: Number, default: 0 },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      review: { type: String },
      star: { type: Number },
    },
  ],
  status: {
    type: String,
    enum: ["Deleted", "Active", "UnAvailable"],
    default: "Active",
  },
});

module.exports = Products;
