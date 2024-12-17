const express = require("express");
const connDb = require("./config/connectDb");
const app = express();
const path = require("path");

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
} = require("./controllers/userController");
const verifyUSer = require("./utils/isAuth");
const {
  CreateProducts,
  getNewCollection,
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

app.post("/user/register", signup);

app.post("/user/login", loginHandler);

app.post("/user/forgetpassword", forgetPass);
app.put("/user/resetpassword/:userId", ResetPass);

app.get("/user/verify/:token", verifyUSer);

app.post("/admin/createProducts", multMid, CreateProducts);

app.get("/getProducts", getNewCollection);

app.get("/product/details/:ProductId", productDetails);

app.get("/fetch/user", IsAuthenticated, fetchUserData);
app.post("/product/search/:value", IsAuthenticated, searchInput);

app.get("/user/cart/:ProductId", IsAuthenticated, AddToCart);
app.get("/user/fetch/cartItems", IsAuthenticated, fetchCartItems);
app.get("/user/remove/cartItems/:productId", IsAuthenticated, removeFromCart);

app.post("/user/create/order", IsAuthenticated, CreateOrder);

// Start Server
app.listen(port, () => {
  console.log("Server is listening on port", port);
});





