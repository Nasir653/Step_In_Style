const moongoose = require("mongoose");

const WomensModel = moongoose.model("WomensProducts", {
  title: { type: String },
  details: { type: String },
  price: { type: String },
  imageUrl: { type: String },
  category: {
    type: String,
    enum: ["Womens"],
    default: null,
  },
  type: {
    type: String,
    enum: [
      "Shirts",
      "T-Shirts",
      "Jeans",
      "ShoesAndHeels",
      "Kurtas",
      "Dresses",
      "Saares",
      "Handbags",
    ],
    default: null,
  },

  createdOn: { type: Date, default: Date.now() },
  updatedOn: { type: Date, default: Date.now() },
});

module.exports = WomensModel;
