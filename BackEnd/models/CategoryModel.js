const mongoose = require("mongoose");

const CategoryModel = mongoose.model("Category", {
  img: { type: String },
  title: { type: String },
});

module.exports = CategoryModel;
