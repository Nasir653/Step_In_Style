const mongoose = require("mongoose");

const CategoryModel = mongoose.model("Category", {
  img: { type: String },
  heading: { type: String },
});

module.exports = CategoryModel;
