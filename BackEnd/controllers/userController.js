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

    const user = await User.findById(userId);

    if (!user) {
      return messageHandler(res, 404, "Please Login ");
    }

    messageHandler(res, 200, " User Data", user);
  } catch (error) {
    console.log(error);
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

const EditUser = async (req, res) => {
  try {
    console.log(req.body);

    const { phone, address } = req.body;
    const userId = req.userId; // Assume userId is provided by authentication middleware

    // Validate input
    if (!phone || !address || !address.length) {
      return res.status(400).json({ error: "Phone and address are required." });
    }

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { phone, address },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res
      .status(200)
      .json({ success: "User updated successfully", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong while updating user details" });
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

    console.log(value);

    const product = await Products.find();

    const getProduct = product.filter(
      (ele) => ele.type === value || ele.title.startsWith(value)
    );

    if (getProduct) {
      return messageHandler(res, 200, "Your Searched Items", getProduct);
    }
  } catch (error) {
    messageHandler(res, 500, "Server Error");
    console.log(Error);
  }
};

const AddToCart = async (req, res) => {
  try {
    const { ProductId } = req.params;

    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return messageHandler(res, 401, " UnAuthorized");
    }

    const alreadyInCart = user.cart.findIndex(
      (item) => item._id.toString() === ProductId
    );

    if (alreadyInCart > -1) {
      return messageHandler(res, 200, "Already in Cart ");
    }

    const product = await Products.findById(ProductId);

    if (!product) {
      return messageHandler(res, 404, "Something Went Wrong ! UnAvaibalbe");
    }

    user.cart.push(product._id);
    user.save();
    return messageHandler(res, 200, "Added To Cart", user);
  } catch (error) {
    messageHandler(res, 500, "Server Error");
    console.log(error);
  }
};

const fetchCartItems = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate({
      path: "cart",
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

    const { ordercost } = req.body;
    const { productId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return messageHandler(res, 401, "UnAuthorized ! Please Login Again");
    }

    if (!user.phone || !user.address) {
      return messageHandler(res, 400, "Please enter phone number and address");
    }

    const Order = await Orders.create({
      ordercost: ordercost,
      user: userId,
    });

    if (!Order) {
      return messageHandler(res, 404, "Something Went Wrong");
    } else {
      messageHandler(res, 200, "Order Created Successfully", Order);
      user.orders.push(Order._id.toString());
      user.save();
    }
  } catch (error) {
    console.log(error);
    messageHandler(res, 500, "Server Error");
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
  EditUser,
};
