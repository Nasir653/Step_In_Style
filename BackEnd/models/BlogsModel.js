const mongoose = require("mongoose");
const Blogs = mongoose.model("Blogs", {
  content: String,
});

module.exports = Blogs;
