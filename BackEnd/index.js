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
  fetchOrderById,
  CancelOrder,
  SuggestedItems,
  EditAddress,
  blogs,
  EditUser,
} = require("./controllers/userController");
const verifyUSer = require("./utils/isAuth");
const {
  CreateProducts,
  getAllProducts,
  AdminLogin,
  newCollectionProducts,
  EditNewCategory,
  fetchNewCategory,
  CreateNewCategory,
  editNewCollection,
  getProductById,
  fetchAllOrder,
  getLastMonthUsers,
  editProducts,
  DeleteProducts,
  DispatchOrder,
  fetchALLUsers,
  DeleteCategory,
} = require("./controllers/adminControler");
const { multMid } = require("./middleWares/imgUploader");
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
app.post("/user/editUser", IsAuthenticated, multMid, EditUser);
app.get("/user/verify/:token", verifyUSer);
app.get("/fetch/user", IsAuthenticated, fetchUserData);
app.post("/edit/user", IsAuthenticated, EditAddress);
app.get("/user/SuggestedItems/:type", IsAuthenticated, SuggestedItems);
app.post("/user/Blogs", IsAuthenticated, blogs);

// Admin Routes

app.post("/admin/createProducts", IsAuthenticated, multMid, CreateProducts);
app.put("/admin/editProducts/:ProductId", IsAuthenticated, editProducts);
app.get("/get/newCollection/:category", IsAuthenticated, newCollectionProducts);
app.put(
  "/admin/edits/newCollection/:productId",
  IsAuthenticated,
  multMid,
  editNewCollection
);
app.delete(
  "/admin/delete/products/:productId",
  IsAuthenticated,
  DeleteProducts
);
app.get("/fetch/allOrders", IsAuthenticated, fetchAllOrder);
app.get("/fetch/allUsers", IsAuthenticated, fetchALLUsers);
app.get("/fetch/lastMonthsUser", IsAuthenticated, getLastMonthUsers);
app.get("/dispatch/order", IsAuthenticated, DispatchOrder);

app.post("/create/newCategory", multMid, CreateNewCategory);
app.post("/admin/Creates/newCategory/:categoryId", multMid, EditNewCategory);
app.get("/fetch/allNewCatwgory", fetchNewCategory);
app.delete("/admin/deleteCategory", DeleteCategory);

// Products Routes
app.get("/get/AllProducts", getAllProducts);
app.get("/getAllProducts/:category/:type", getAllProducts);
app.get("/getProductById/:productId", getProductById);
app.get("/get/newCollection/:category", getAllProducts);
app.get("/get/trendingCollection/:category", getAllProducts);
app.post("/product/search/:value", IsAuthenticated, searchInput);

//Cart Routes
app.post("/user/cart/:ProductId", IsAuthenticated, AddToCart);
app.get("/user/fetch/cartItems", IsAuthenticated, fetchCartItems);
app.get("/user/remove/cartItems/:productId", IsAuthenticated, removeFromCart);

// Order Routes
app.post("/user/create/order", IsAuthenticated, CreateOrder);
app.get("/user/OrderById/:OrderId", IsAuthenticated, fetchOrderById);
app.get("/user/CancelOrder/:OrderId", IsAuthenticated, CancelOrder);

// Start Server   Port
app.listen(port, () => {
  console.log("Server is listening on port", port);
});
