const express = require("express");
const connDb = require("./config/connectDb");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  loginHandler,
  signup,
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
} = require("./controllers/userController");
const verifyUSer = require("./utils/isAuth");
const {
  CreateProducts,
  getAllProducts,
  CreateWomensProducts,
  fetchWomensProducts,
  AdminRegistration,
  AdminLogin,
  newCollectionProducts,
} = require("./controllers/adminControler");
const { multMid } = require("./middleWares/imgUploader");
const { productDetails } = require("./controllers/Products");
const cookieParser = require("cookie-parser");
const { IsAuthenticated } = require("./middleWares/IsAuthenticated");

// Port
const port = 4000;

// Database
connDb();

// Set Engine

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

// User Routes
app.post("/user/register", signup);
app.post("/user/login", loginHandler);
app.get("/user/logout", Logout);
app.post("/user/forgetpassword", forgetPass);
app.put("/user/resetpassword/:userId", ResetPass);
app.post("/user/profilePic", IsAuthenticated, multMid, ProfilePic);
app.get("/user/verify/:token", verifyUSer);
app.get("/fetch/user", IsAuthenticated, fetchUserData);

// Admin Routes
app.post("/admin/signup", AdminRegistration);
app.post("/admin/login", AdminLogin);
app.post("/admin/createProducts", multMid, CreateProducts);

app.get("/get/newCollection/:category", newCollectionProducts);

// Products Routes
app.get("/getAllProducts/:category/:type", getAllProducts);
app.get("/get/newCollection/:category", getAllProducts);

app.get("/product/details/:ProductId", productDetails);

app.post("/product/search/:value", IsAuthenticated, searchInput);

//Cart Routes
app.get("/user/cart/:ProductId", IsAuthenticated, AddToCart);
app.get("/user/fetch/cartItems", IsAuthenticated, fetchCartItems);
app.get("/user/remove/cartItems/:productId", IsAuthenticated, removeFromCart);

// Order Routes
app.post("/user/create/order", IsAuthenticated, CreateOrder);

// Start Server   Port
app.listen(port, () => {
  console.log("Server is listening on port", port);
});
