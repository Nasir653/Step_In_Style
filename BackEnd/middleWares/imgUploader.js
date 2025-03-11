const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,

  // cloud_name: "dhc6axjlg",
  // api_key: "439222735114564",
  // api_secret: "_knbw7gZ8HbKV_kRNUOPa3pfXEQ"
});

const upload = multer({
  dest: "uploads/",
  limits: {
    fieldSize: 1024 * 1024 * 10,
  },
}); // destination set for uploaded files

const multMid = upload.single("image");

module.exports = { cloudinary, multMid };
