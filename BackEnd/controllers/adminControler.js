const cloudinary = require("cloudinary").v2;
const AdminModel = require("../models/AdminModel");
const Products = require("../models/products");
const { messageHandler } = require("../utils/MessageHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AdminRegistration = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (username === "" || email === "" || password === "") {
      return messageHandler(res, 404, "All Crendential's Required");
    }

    const getEmail = await AdminModel.findOne({ email });

    if (getEmail) {
      return messageHandler(res, 404, "Email Already Exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const IsRegister = await AdminModel({
      username,
      email,
      password: hashPassword,
    });

    if (IsRegister) {
      IsRegister.save();
      console.log("Admin Created Successfully");
      messageHandler(res, 200, "Admin Created Successfully");
    } else {
      messageHandler(res, 404, "Somethimg Went Wrong");
    }
  } catch (error) {
    console.log(error);
    messageHandler(res, 500, "Server Error");
  }
};

const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === "" || password === "") {
      return messageHandler(res, 404, "All Fields Required");
    }

    const checkAdmin = await AdminModel.findOne({ email });

    if (!checkAdmin) {
      return messageHandler(res, 401, "Admin Not Found");
    } else {
      const checkPassword = await bcrypt.compare(password, checkAdmin.password);

      if (!checkPassword) {
        return messageHandler(res, 401, "Incorrect Password");
      } else {
        const userId = checkAdmin._id;
        const secretKey = "secretKeyForLogin";

        const token = jwt.sign({ userId }, secretKey);

        if (token) {
          res.cookie("adminToken", token, {
            maxAge: 1000 * 60 * 60 * 24 * 30, // one month in miiliseconds
            httpOnly: true,
            secure: true,
            sameSite: "None",
          });
        }

        return messageHandler(res, 200, "Login Successfully", checkAdmin);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ messgae: " server Error" });
  }
};

const CreateProducts = async (req, res) => {
  try {
    const { title, details, price, category, subCategory, type } = req.body;

    console.log(subCategory);

    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "pp",
    });

    const creates = await Products({
      title: title,
      details: details,
      price: price,
      category: category,
      subCategory: subCategory,
      imageUrl: upload.secure_url,
      type: type,
    });

    if (!creates) {
      return res
        .status(400)
        .json({ message: "SomeThing went wrong ! Try After Sometime" });
    }

    creates.save();

    return res
      .status(200)
      .json({ message: "Product Created  Succesfully", payload: creates });
  } catch (error) {
    res.json({ message: "Server Error" });
    console.log(error);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { category, type } = req.params;
    const getData = await Products.find({
      $and: [
        { category: { $regex: category, $options: "i" } },
        { type: { $regex: type, $options: "i" } },
      ],
    });

    if (getData) {
      messageHandler(res, 200, "Your data", getData);
    }
  } catch (error) {
    console.log(error);
  }
};

const newCollectionProducts = async (req, res) => {
  try {
    const { category } = req.params;
    console.log(category);

    const Data = await Products.find({ subCategory: category });

    if (!Data) {
      return messageHandler(res, 404, "No Data Found");
    }

    messageHandler(res, 200, "Your Data", Data);
  } catch (error) {
    messageHandler(res, 500, "Server Error");
    console.log(Error);
  }
};

module.exports = {
  CreateProducts,
  getAllProducts,
  AdminRegistration,
  AdminLogin,
  newCollectionProducts,
};
