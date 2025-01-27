const bcrypt = require("bcrypt");
const transporters = require("../utils/nodeMailer");
const jwt = require("jsonwebtoken");
const { messageHandler } = require("../utils/MessageHandler");
const { Orders } = require("../models/OrdersModel");
const User = require("../models/UserModel");
const Products = require("../models/products");
const cloudinary = require("cloudinary").v2;

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("Request Body:", req.body);

    if (!username || !email || !password) {
      return res.json({ message: "All Fields Required" });
    }

    const getEmail = await User.findOne({ email });
    if (getEmail) {
      return res.json({ message: "Email already registered" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashPassword });

    await newUser.save();
    console.log("User Created Successfully");
    messageHandler(res, 200, "Account Created Successfully");
  } catch (error) {
    console.error("Error in signup:", error);
    messageHandler(res, 500, "Server Error");
  }
};

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === "" || password === "") {
      return res.json({ message: "All Fields Required" });
    }

    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return res.json({ message: "User Not Found" });
    } else {
      const checkPassword = await bcrypt.compare(password, checkUser.password);

      if (!checkPassword) {
        res.json({ message: "Incorrect Password" });
      } else {
        const userId = checkUser._id;
        const secretKey = "secretKeyForLogin";

        const token = jwt.sign({ userId }, secretKey);

        if (token) {
          res.cookie("token", token, {
            maxAge: 1000 * 60 * 60 * 24 * 30, // one month in miiliseconds
            httpOnly: true,
            secure: true,
            sameSite: "None",
          });
        }

        return res.status(200).json({
          message: "Login Successfully",
        });
      }
    }
  } catch (error) {
    console.log("Server error");
    res.status(500).json({ messgae: " server Error" });
  }
};

const Logout = async (req, res) => {
  try {
    const LoggingOut = res.clearCookie("token", { path: "/" });

    if (LoggingOut) {
      messageHandler(res, 200, "Logout Successfully");
    }
  } catch (error) {
    console.log(error);
    messageHandler(res, 500, "Server Error");
  }
};

const fetchUserData = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate({
      path: "orders",
      populate: {
        path: "products.productId",
        model: "Products",
      },
    });

    if (!user) {
      return messageHandler(res, 404, "Please Login");
    }

    messageHandler(res, 200, "User Data", user);
  } catch (error) {
    console.error("Error fetching user data:", error);

    messageHandler(res, 500, "Internal Server Error");
  }
};

const forgetPass = async (req, res) => {
  try {
    const { email } = req.body;

    if (email === "") {
      res.status(404).json({ message: "Please Enter Your Registered Email" });
    }

    const findUser = await User.findOne({ email });

    console.log(findUser);

    if (!findUser) {
      res.status(404).json({ message: "Your Email is not Registered " });
    } else {
      const passwordResetLink = `http://localhost:3000/user/resetPassword/${findUser._id}`;

      transporters.sendMail(
        {
          from: "malikaadi653@gmail.com",
          to: email,
          // bcc : "services@stylehouse.world",
          subject: "Password reset Link ",
          text: passwordResetLink,
          html: `
       

  <h1>   Hi ${findUser.username} </h1>
<br>  
<p>
We received a request to reset your password for your account. Click the link below to set a new
password:
<br>
      ${passwordResetLink}
<br>
If you didn't request this change, please ignore this email. This link will expire in [time limit, e.g., 1 hour].
<br>
If you have any questions, feel free to contact our support team at Malikaadi653@gmail.com. </p>

<br>
<br>
<h3>
Thank you,

</h3>
       
          `,
        },
        (reject, resolve) => {
          if (reject) {
            console.log(reject + " reject");
            return res
              .status(404)
              .json({ message: "Email not sended ! SomeThing Went Wrong" });
          }

          console.log(resolve);

          return res.status(200).json({
            message: "Password Rest link sent to your mail Succesfully",
          });
        }
      );
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const ResetPass = async (req, res) => {
  try {
    const { newPass, confirmPass } = req.body;

    if (newPass !== confirmPass) {
      return res.status(400).json({ message: "Password not Match" });
    }

    console.log(newPass);

    const { userId } = req.params;

    console.log(userId);

    const hashPass = await bcrypt.hash(confirmPass, 10);

    const findUser = await User.findByIdAndUpdate(userId, {
      password: hashPass,
    });

    console.log(findUser);

    if (!findUser) {
      return res.status(404).json({ message: "Something  went wrong" });
    } else {
      return res.status(200).json({ message: "Password Change Successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const EditAddress = async (req, res) => {
  try {
    const {
      fullName,
      street,
      city,
      district,
      state,
      pincode,
      landmark,
      contact,
    } = req.body;

    console.log(req.body);

    const userId = req.userId;

    if (
      !fullName ||
      !contact ||
      !street ||
      !city ||
      !district ||
      !state ||
      !pincode ||
      !landmark
    ) {
      return messageHandler(res, 401, "All Field are Required");
    }

    const user = await User.findById(userId);
    if (!user) {
      return messageHandler(res, 404, "User Not Found");
    }

    if (!user.address || user.address.length === 0) {
      user.address = [
        {
          fullName,
          street,
          city,
          district,
          state,
          pincode,
          landmark,
          contact,
        },
      ];
    } else {
      user.address[0] = {
        fullName,
        street,
        city,
        district,
        state,
        pincode,
        landmark,
        contact,
      };
    }
    await user.save();

    return messageHandler(res, 200, "Adress is Addded Successfully", user);
  } catch (error) {
    console.error("Error updating user:", error);
    return messageHandler(res, 500, "Server Error");
  }
};

const ProfilePic = async (req, res) => {
  try {
    const userId = req.userId;

    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "pp",
    });

    const user = await User.findByIdAndUpdate(userId, {
      profilePic: upload.secure_url,
    });

    if (!user) {
      return messageHandler(res, 401, "UnAuthorized");
    }

    return messageHandler(res, 200, "Profile Pic Changed");
  } catch (error) {
    messageHandler(res, 500, "Server Error");
    console.error(error);
  }
};

const searchInput = async (req, res) => {
  try {
    const { value } = req.params;

    if (!value) {
      return messageHandler(res, 400, "Search value is required");
    }

    const matchingProducts = await Products.find({
      $or: [
        { title: { $regex: value, $options: "i" } },
        { type: { $regex: value, $options: "i" } },
      ],
    });

    if (matchingProducts.length === 0) {
      return messageHandler(res, 404, "No products found matching your search");
    }

    return messageHandler(res, 200, "Your Searched Items", matchingProducts);
  } catch (error) {
    console.error("Server Error:", error);
    return messageHandler(res, 500, "Server Error");
  }
};

const AddToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { ProductId } = req.params;
    const { quantity, color, size } = req.body;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.render("error", {
        backToPage: "/",
        errorMessage: "Some Error, Kindly Login Again!",
      });
    }

    // Find the product
    const product = await Products.findById(ProductId);
    if (!product) {
      return res.render("error", {
        backToPage: "/",
        errorMessage: "Product Not Available",
      });
    }

    // Check if the product with the same color and size exists in the cart
    const cartItemIndex = user.cart.findIndex((item) => {
      return (
        item.productId.toString() === ProductId &&
        item.color === color &&
        item.size === size
      );
    });

    if (cartItemIndex > -1) {
      // Update the quantity if the item exists in the cart
      user.cart[cartItemIndex].qty += parseInt(quantity, 10);
    } else {
      // Add the item to the cart if it does not exist
      user.cart.push({
        productId: product._id,
        qty: parseInt(quantity, 10),
        price: product.price,
        color: color,
        size: size,
      });
    }

    // Save the user with the updated cart
    await user.save();

    // Return success message
    return messageHandler(res, 200, "Added To Cart", user);
  } catch (error) {
    // Handle server error
    messageHandler(res, 500, "Server Error");
    console.error(error);
  }
};

const fetchCartItems = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate({
      path: "cart.productId",
    });

    if (!user) {
      return messageHandler(res, 404, "Something Went Wrong ! Please Login");
    } else return messageHandler(res, 200, "Your Cart ", user.cart);
  } catch (error) {
    messageHandler(res, 500, "Server Error");
    console.log("Error");
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return messageHandler(res, 401, "UnAuthorized, Please Login");
    }

    const cartItem = await user.cart.findIndex(
      (item) => item._id.toString() === productId
    );

    console.log(cartItem);

    if (cartItem > -1) {
      const remove = user.cart.splice(cartItem, 1);

      if (remove) {
        user.save();
        messageHandler(res, 200, "Product Removed");
      }
    }
  } catch (error) {
    messageHandler(res, 500, "Server Error");
    console.log(error);
  }
};

const CreateOrder = async (req, res) => {
  try {
    const userId = req.userId;

    const { price, size, color, qty } = req.body;
    const { productId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return messageHandler(res, 401, "Unauthorized! Please login again.");
    }

    if (!user.address || user.address.length === 0) {
      return messageHandler(res, 400, "Please add an address to your profile.");
    }

    const totalCost = qty * price;

    const userAddress = user.address[0];

    const order = await Orders.create({
      user: userId,
      products: [
        {
          productId: productId,
          qty: qty,
          price: price,
          size: size,
          color: color,
        },
      ],
      address: [
        {
          fullname: user.username,
          street: userAddress.street,
          city: userAddress.city,
          district: userAddress.district,
          state: userAddress.state,
          contact: user.phone,
          pincode: userAddress.pincode,
          landmark: userAddress.landmark,
        },
      ],
      totalAmount: totalCost,
    });

    if (!order) {
      return messageHandler(res, 500, "Failed to create the order.");
    }

    user.orders.push(order._id.toString());
    await user.save();

    return messageHandler(res, 200, "Order created successfully", order);
  } catch (error) {
    console.error("Error in CreateOrder:", error);
    return messageHandler(res, 500, "Server error. Please try again later.");
  }
};

const fetchOrderById = async (req, res) => {
  try {
    const { OrderId } = req.params;

    const fetch = await Orders.findById(OrderId).populate({
      path: "products.productId",
    });

    if (!fetch) {
      return messageHandler(res, 404, "Order Not Found");
    }
    return messageHandler(res, 200, "Your Order", fetch);
  } catch (error) {
    console.log(error);
    return messageHandler(res, 500, "Server Error");
  }
};

const CancelOrder = async (req, res) => {
  try {
    const { OrderId } = req.params;

    const fetch = await Orders.findByIdAndUpdate(OrderId, {
      orderStatus: "Cancelled",
    });

    if (!fetch) {
      return messageHandler(res, 404, "Order Not Found");
    }
    messageHandler(res, 200, "Order Cancelled");
  } catch (error) {
    console.log(Error);
    messageHandler(res, 500, "Server Error");
  }
};

const SuggestedItems = async (req, res) => {
  try {
    const { type } = req.params;

    const fetch = await Products.find({ type: type });

    if (!fetch) {
      return messageHandler(
        res,
        404,
        "No Suggestion Items found of this product"
      );
    }

    return messageHandler(res, 200, "Suggested Items for This Product", fetch);
  } catch (error) {
    console.log(error);
    return messageHandler(res, 500, "Server Error");
  }
};

module.exports = {
  signup,
  loginHandler,
  forgetPass,
  ResetPass,
  fetchUserData,
  CreateOrder,
  AddToCart,
  fetchCartItems,
  removeFromCart,
  searchInput,
  Logout,
  ProfilePic,
  EditAddress,
  CancelOrder,
  fetchOrderById,
  SuggestedItems,
};
