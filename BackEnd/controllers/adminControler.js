const cloudinary = require("cloudinary").v2;
const AdminModel = require("../models/AdminModel");
const CategoryModel = require("../models/CategoryModel");
const { Orders } = require("../models/OrdersModel");
const Products = require("../models/products");
const { messageHandler } = require("../utils/MessageHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

// const AdminRegistration = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     if (username === "" || email === "" || password === "") {
//       return messageHandler(res, 404, "All Crendential's Required");
//     }

//     const getEmail = await AdminModel.findOne({ email });

//     if (getEmail) {
//       return messageHandler(res, 404, "Email Already Exists");
//     }

//     const hashPassword = await bcrypt.hash(password, 10);

//     const IsRegister = await AdminModel({
//       username,
//       email,
//       password: hashPassword,
//     });

//     if (IsRegister) {
//       IsRegister.save();
//       console.log("Admin Created Successfully");
//       messageHandler(res, 200, "Admin Created Successfully");
//     } else {
//       messageHandler(res, 404, "Somethimg Went Wrong");
//     }
//   } catch (error) {
//     console.log(error);
//     messageHandler(res, 500, "Server Error");
//   }
// };

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
    const {
      title,
      details,
      price,
      category,
      subCategory,
      type,
      sizes,
      colors,
      qty,
    } = req.body;

    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "AllProducts",
    });

    const creates = await Products({
      title: title,
      details: details,
      price: price,
      category: category,
      subCategory: subCategory,
      imageUrl: upload.secure_url,
      type: type,
      sizes: sizes,
      colors: colors,
      qty: qty,
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

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const getPro = await Products.findById(productId);

    if (!getPro) {
      return messageHandler(req, 404, "Product Not Found");
    }

    return messageHandler(res, 200, "Your Product", getPro);
  } catch (error) {
    messageHandler(res, 500, "Server Error");
    console.log(error);
  }
};
const newCollectionProducts = async (req, res) => {
  try {
    const { category } = req.params;

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

const editNewCollection = async (req, res) => {
  try {
    const { productId } = req.params;
    const { title, price } = req.body;

    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "Products",
    });

    if (!upload) {
      return messageHandler(
        res,
        404,
        "Image Not uploaded ! Something went wrong"
      );
    }

    const update = await Products.findByIdAndUpdate(productId, {
      title: title,
      price: price,
      imageUrl: upload.secure_url,
    });

    if (!update) {
      return messageHandler(
        res,
        404,
        "Something went wrong ! Try After Some Time"
      );
    }
    return messageHandler(res, 200, "Edited Sucessfully", update);
  } catch (error) {
    return messageHandler(res, 500, "Server Error");
  }
};

const deleteNewCollection = async (req, res) => {
  try {
    const { productId } = req.params;

    const deleteProduct = await Products.findByIdAndDelete(productId);

    if (!deleteProduct) {
      return messageHandler(res, 404, "Something went wrong");
    }

    return messageHandler(res, 204, "Deleted Sucessfully");
  } catch (error) {
    return messageHandler(res, 500, "Server Error");
  }
};

const CreateNewCategory = async (req, res) => {
  try {
    const { title } = req.body;

    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "Category",
    });

    if (!upload) {
      return messageHandler(
        res,
        404,
        "Image Not uploaded ! Something went wrong"
      );
    }

    const create = await CategoryModel.create({
      img: upload.secure_url,
      title: title,
    });

    if (!create) {
      return messageHandler(
        res,
        404,
        "Something Went Wrong ! Try After Some Time"
      );
    } else {
      return messageHandler(
        res,
        200,
        "New Category Created Successfully",
        create
      );
    }
  } catch (error) {
    messageHandler(res, 500, "Server Error");
    console.log(error);
  }
};

const EditNewCategory = async (req, res) => {
  try {
    const { title } = req.body;
    const { categoryId } = req.params;

    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "Category",
    });

    if (!upload) {
      return messageHandler(
        res,
        404,
        "Image Not uploaded ! Something went wrong"
      );
    }

    const update = await CategoryModel.findByIdAndUpdate(categoryId, {
      img: upload.secure_url,
      title: title,
    });

    if (!update) {
      return messageHandler(
        res,
        404,
        "Something Went Wrong ! Try After Some Time"
      );
    } else {
      return messageHandler(res, 200, "Edited Successfully", update);
    }
  } catch (error) {
    messageHandler(res, 500, "Server Error");
    console.log(error);
  }
};

const fetchNewCategory = async (req, res) => {
  try {
    const fetch = await CategoryModel.find().lean();

    if (!fetch) {
      return messageHandler(res, 404, "Something Went wrong");
    }
    return messageHandler(res, 200, "Your Data", fetch);
  } catch (error) {
    return messageHandler(res, 500, "Server Error");
  }
};

const fetchAllOrder = async (req, res) => {
  try {
    const fetchOrders = await Orders.find();

    if (fetchOrders) {
      return messageHandler(res, 200, "All Orders", fetchOrders);
    }

    return messageHandler(res, 404, "No Order found");
  } catch (error) {
    console.log(Error);
    messageHandler(res, 500, "Server Error");
  }
};

const getLastMonthUsers = async (req, res) => {
  try {
    const now = new Date();

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);

    const recentUsers = await User.find({
      createdOn: {
        $gte: thirtyDaysAgo,
        $lte: now,
      },
    });
    if (recentUsers) {
      return messageHandler(res, 200, "Last Months New Users", recentUsers);
    }

    return messageHandler(res, 404, "No User Found");
  } catch (error) {
    console.log(error);
    return messageHandler(res, 500, "Server Error");
  }
};

module.exports = {
  CreateProducts,
  getAllProducts,
  AdminLogin,
  newCollectionProducts,
  CreateNewCategory,
  EditNewCategory,
  fetchNewCategory,
  editNewCollection,
  deleteNewCollection,
  getProductById,
  fetchAllOrder,
  getLastMonthUsers,
};
