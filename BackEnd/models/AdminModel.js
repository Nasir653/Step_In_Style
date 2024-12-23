const mongoose = require("mongoose");

const AdminModel = mongoose.model("Admin", {
  username: { type: String },
  email: { type: String },
  password: { type: String },
  phone: { type: String },
  profilePic: { type: String },
  adress: { type: String },
  upatedOn: { type: Date, default: Date.now() },
  createdOn: { type: Date, default: Date.now() },
});

module.exports = AdminModel;
