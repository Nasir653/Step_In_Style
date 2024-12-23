import ForgetPassword from "./Componants/ForgetPassword";
import { Route, Routes } from "react-router-dom";
import Login from "./Componants/Login";
import { Registration } from "./Componants/Registration";
import NavBar from "./SharedComponants/NavBar";
import ResetPass from "./Componants/ResetPass";
import NoPageFound from "./Componants/NoPageFound";
import ProductDetails from "./Componants/ProductDetails";
import { context } from "./Context/Store";
import { useContext, useEffect } from "react";
import Cart from "./Componants/Cart";
import SearchedProducts from "./Componants/SearchedProducts";
import HomePage from "./Componants/HomePage/HomePage";
import Mens from "./Componants/MensPage/Mens";
import Footer from "./SharedComponants/Footer";
import Womens from "./Componants/Womenspage/Womens";
import Profile from "./Componants/Profile";
import CreateProducts from "./Componants/AdminPages/CreateProducts";
import CreateMensProducts from "./Componants/AdminPages/CreateMensProducts";
import AdminHomePage from "./Componants/AdminPages/AdminHomePage";
import MensShirts from "./Componants/MensPage/MensShirts";
import CreateWomens from "./Componants/AdminPages/CreateWomens";
import WomensKurtas from "./Componants/Womenspage/WomensKurtas";
import AdminLogin from "./Componants/AdminPages/AdminLogin";
import AdminSignUp from "./Componants/AdminPages/AdminSignUp";

function App() {
  const { getData, fetchUserData, getWomensProducts, loading, fetchCartItems } =
    useContext(context);

  useEffect(() => {
    fetchUserData();
    getWomensProducts();
    fetchCartItems();
  }, [getData, fetchUserData, getWomensProducts, loading, fetchCartItems]);

  return (
    <div>
      <NavBar />

      <div className="conatainer-fluid">
        <Routes>
          {/* Universal Routes */}
          <Route path="*" element={<NoPageFound />} />
          <Route path="/" element={<HomePage />} />

          {/* User Routes */}
          <Route path="/user/register" element={<Registration />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/forgetpassword" element={<ForgetPassword />} />
          <Route path="/user/resetpassword/:userId" element={<ResetPass />} />
          <Route path="/user/profile" element={<Profile />} />

          {/* Product Routes */}
          <Route path="/Searched/items" element={<SearchedProducts />} />
          <Route path="/Category/mens" element={<Mens />} />
          <Route path="/Category/womens" element={<Womens />} />
          <Route
            path="/product/details/:productId"
            element={<ProductDetails />}
          />
          <Route path="/mens/shirts" element={<MensShirts />} />
          <Route path="/womens/kurtas" element={<WomensKurtas />} />

          {/* Admin route */}
          <Route path="/admin/signup" element={<AdminSignUp />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/admin/portal" element={<CreateProducts />} />
          <Route path="/Create/mensProducts" element={<CreateMensProducts />} />
          <Route path="/Create/womensProducts" element={<CreateWomens />} />

          {/* Cart Routes */}
          <Route path="/user/cart" element={<Cart />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
