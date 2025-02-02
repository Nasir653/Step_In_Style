import ForgetPassword from "./Componants/UserPages/ForgetPassword";
import { Route, Routes } from "react-router-dom";
import Login from "./Componants/UserPages/Login";
import { Registration } from "./Componants/UserPages/Registration";
import NavBar from "./SharedComponants/NavBar";
import ResetPass from "./Componants/UserPages/ResetPass";
import NoPageFound from "./Componants/UserPages/NoPageFound";
import ProductDetails from "./Componants/UserPages/ProductDetails";
import { context } from "./Context/Store";
import { useContext, useEffect } from "react";
import Cart from "./Componants/UserPages/Cart";
import SearchedProducts from "./Componants/UserPages/SearchedProducts";
import HomePage from "./Componants/HomePage/HomePage";
import Mens from "./Componants/MensPage/Mens";
import Footer from "./SharedComponants/Footer";
import Womens from "./Componants/Womenspage/Womens";
import Profile from "./Componants/UserPages/Profile";
import CreateMensProducts from "./Componants/AdminPages/CreateProducts";
import AdminHomePage from "./Componants/AdminPages/AdminHomePage";
import AdminLogin from "./Componants/AdminPages/AdminLogin";
import AdminSignUp from "./Componants/AdminPages/AdminSignUp";
import LandingPage from "./Componants/AdminPages/EditLandingPage/LandingPage";
import MensCategory from "./Componants/MensPage/MensCategory";
import WomensCategory from "./Componants/Womenspage/WomensCategory";
import UserDetails from "./Componants/UserPages/UserDetails";
import OrderPage from "./Componants/UserPages/OrderPage";
import CreateProducts from "./Componants/AdminPages/CreateProducts";
import AllProductsPage from "./Componants/AdminPages/AllProductsPage";
import OrderStatus from "./Componants/UserPages/OrderStatus";
import OrderDetails from "./Componants/OrderDetails";
import Editor from "./Componants/Editor";
import AllOrdersPage from "./Componants/AdminPages/AllOrdersPage";
import Customers from "./Componants/AdminPages/Customers";

function App() {
  const { fetchUserData, fetchCartItems, loading, fetchNewCategory } =
    useContext(context);

  useEffect(() => {
    fetchUserData();
    fetchCartItems();
    fetchNewCategory();
  }, [fetchUserData, fetchCartItems, loading]);

  return (
    <div>
      <NavBar />

      <div className="conatainer-fluid">
        <Routes>
          {/* Universal Routes */}
          <Route path="*" element={<NoPageFound />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/landingPage" element={<LandingPage />} />
          <Route path="/Editor" element={<Editor />} />
          <Route
            path="/Order/OrderDetails/:OrderId"
            element={<OrderDetails />}
          />

          {/* User Routes */}
          <Route path="/user/register" element={<Registration />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/forgetpassword" element={<ForgetPassword />} />
          <Route path="/user/resetpassword/:userId" element={<ResetPass />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/addDetails" element={<UserDetails />} />
          <Route path="/user/PlacedOrder/:productId" element={<OrderPage />} />
          <Route path="/user/OrderStatus" element={<OrderStatus />} />

          {/* Product Routes */}
          <Route path="/Searched/items" element={<SearchedProducts />} />
          <Route path="/Category/mens" element={<Mens />} />
          <Route path="/Category/womens" element={<Womens />} />
          <Route
            path="/product/details/:productId"
            element={<ProductDetails />}
          />
          <Route path="/mens/shirts/:category" element={<MensCategory />} />
          <Route path="/womens/:category" element={<WomensCategory />} />

          {/* Admin route */}
          <Route path="/admin/signup" element={<AdminSignUp />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/Create/Products" element={<CreateProducts />} />
          <Route path="/get/AllProducts" element={<AllProductsPage />} />
          <Route path="/admin/allOrder" element={<AllOrdersPage />} />
          <Route path="/admin/allCustomers" element={<Customers />} />

          {/* Cart Routes */}
          <Route path="/user/cart" element={<Cart />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
