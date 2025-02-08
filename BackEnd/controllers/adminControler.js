const cloudinary = require("cloudinary").v2;
const AdminModel = require("../models/AdminModel");
const CategoryModel = require("../models/CategoryModel");
const { Orders } = require("../models/OrdersModel");
const Products = require("../models/products");
const { messageHandler } = require("../utils/MessageHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const transporters = require("../utils/nodeMailer");

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

    let query = {};

    if (category && type) {
      query = {
        $and: [
          { category: { $regex: category, $options: "i" } },
          { type: { $regex: type, $options: "i" } },
        ],
      };
    }

    const getData = await Products.find(query, { subCategory: 0 });
    if (getData.length > 0) {
      messageHandler(res, 200, "Your data", getData);
    } else {
      messageHandler(res, 404, "No products found");
    }
  } catch (error) {
    console.error(error);
    messageHandler(res, 500, "An error occurred", error.message);
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

const editProducts = async (req, res) => {
  try {
    const { ProductId } = req.params;
    const { title, details, price, category, colors, sizes, qty } = req.body;

    const update = await Products.findByIdAndUpdate(ProductId, {
      title: title,
      details: details,
      price: price,
      category: category,
      colors: colors,
      sizes: sizes,
      qty: qty,
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

const DeleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.query;

    const deleteCategory = await CategoryModel.findByIdAndDelete(categoryId);

    if (!deleteCategory) {
      return messageHandler(res, 404, "Product not found or already deleted");
    }

    return messageHandler(res, 200, `Category Deleted`);
  } catch (error) {
    console.error("Error during product deletion:", error);
    return messageHandler(res, 500, "Server error");
  }
};

const DeleteProducts = async (req, res) => {
  try {
    const { productId } = req.params;
    const { status } = req.query;

    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      { status: status },
      { new: true }
    );

    if (!updatedProduct) {
      return messageHandler(res, 404, "Product not found or already deleted");
    }

    return messageHandler(res, 200, `Product marked as ${status} successfully`);
  } catch (error) {
    console.error("Error during product deletion:", error);
    return messageHandler(res, 500, "Server error");
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
    const fetchOrders = await Orders.find().populate({
      path: "products.productId",
    });

    if (fetchOrders.length > 0) {
      return messageHandler(res, 200, "All Orders", fetchOrders);
    }

    return messageHandler(res, 404, "No Order found");
  } catch (error) {
    console.error("Error:", error);
    messageHandler(res, 500, "Server Error");
  }
};

const fetchALLUsers = async (req, res) => {
  try {
    const AllUsers = await User.find()
      .populate({
        path: "orders",
        populate: {
          path: "products.productId",
          model: "Products",
        },
      }) // ✅ Closing the first populate correctly
      .populate({
        path: "cart",
        populate: {
          path: "productId",
          model: "Products",
        },
      });

    if (!AllUsers || AllUsers.length === 0) {
      return messageHandler(res, 404, "No Users Found");
    }

    return messageHandler(res, 200, "All Users", AllUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return messageHandler(res, 500, "Server Error");
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

const DispatchOrder = async (req, res) => {
  try {
    const { orderId } = req.query;
    const order = await Orders.findById(orderId)
      .populate("user")
      .populate("products.productId");

    if (!order) {
      messageHandler(res, 404, "OrderId");
    }
    order.orderStatus = "Confirmed";

    const orderConfirmationLink = `http://localhost:3000/user/orders/${order._id}`;

    transporters.sendMail(
      {
        from: "malikaadi653@gmail.com",
        to: order.user.email,
        subject: "Order Confirmation - Step in Style",
        text: `Hi ${order.user.username}, Your order #${order._id} has been Confirmed and will be shipped soon!`,
        html: `
      <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; background: #f9f9f9;">
        <div style="background: #000; padding: 20px; text-align: center; color: #fff;">
          <h1 style="margin: 0;">Step in Style</h1>
        </div>

        <div style="padding: 20px; background: #fff;">
          <h2>Hi ${order.user.username},</h2>
          <p style="font-size: 16px; color: #333;">
            Thank you for shopping with <b>Step in Style</b>! Your order has been <b>Confirmed</b> and will be shipped soon.
          </p>

          <h3 style="color: #000;">📦 Order Details:</h3>
          <div style="background: #f3f3f3; padding: 10px; border-radius: 5px;">
            <p><b>Order ID:</b> ${order._id}</p>
            <p><b>Total Amount:</b> ₹${order.totalAmount}</p>
            <p><b>Order Status:</b> ${order.orderStatus}</p>
            <p><b>Shipping Address:</b><br>
              ${order.address[0]?.street}, ${order.address[0]?.city}, ${
          order.address[0]?.district
        }, 
              ${order.address[0]?.state}, ${order.address[0]?.pincode}.
            </p>
          </div>

          <h3 style="color: #000;">🛒 Products in Your Order:</h3>
          ${order.products
            .map(
              (product) => `
              <div style="display: flex; align-items: center; background: #fff; padding: 10px; border-bottom: 1px solid #ddd;">
                <img src="${product.productId?.imageUrl}" alt="${
                product.productId?.title
              }" 
                     style="width: 80px; height: 80px; object-fit: cover; border-radius: 5px; margin-right: 15px;">
                <div>
                  <p style="margin: 0;"><b>${
                    product.productId?.title || "N/A"
                  }</b></p>
                  <p style="margin: 5px 0;">Price: ₹${product.price}</p>
                  <p style="margin: 5px 0;">Quantity: ${product.qty}</p>
                  <p style="margin: 5px 0;">Color: ${product.color} | Size: ${
                product.size
              }</p>
                </div>
              </div>
            `
            )
            .join("")}

          <div style="text-align: center; margin-top: 20px;">
            <a href="${orderConfirmationLink}" 
               style="display: inline-block; background: #000; color: #fff; padding: 12px 20px; 
               text-decoration: none; border-radius: 5px; font-size: 16px;">
              Track Your Order 🚚
            </a>
          </div>
          
          <p style="text-align: center; font-size: 14px; color: #666; margin-top: 20px;">
            If you have any questions, contact us at <b>malikaadi653@gmail.com</b>.
          </p>
        </div>

        <div style="background: #000; color: #fff; text-align: center; padding: 15px;">
          <p style="margin: 0;">Thank you for choosing <b>Step in Style</b>! We hope to serve you again soon.</p>
        </div>
      </div>
    `,
      },
      (error, info) => {
        if (error) {
          console.log(error + " reject");
          return res
            .status(404)
            .json({ message: "Email not sent! Something went wrong." });
        }

        return res.status(200).json({
          message: "Order confirmation email sent successfully.",
        });
      }
    );

    order.save();
    messageHandler(res, 200, "Order Confirmed", order);
  } catch (error) {
    console.log(error);

    messageHandler(res, 500, "Server Error");
  }
};

module.exports = {
  CreateProducts,
  getAllProducts,
  newCollectionProducts,
  CreateNewCategory,
  EditNewCategory,
  fetchNewCategory,
  editNewCollection,
  DeleteProducts,
  getProductById,
  fetchAllOrder,
  getLastMonthUsers,
  editProducts,
  DispatchOrder,
  fetchALLUsers,
  DeleteCategory,
};
