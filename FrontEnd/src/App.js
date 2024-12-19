import ForgetPassword from "./Componants/ForgetPassword";
import { Route, Routes } from "react-router-dom";
import Login from "./Componants/Login";
import { Registration } from "./Componants/Registration";
import NavBar from "./SharedComponants/NavBar";
import ResetPass from "./Componants/ResetPass";
import NoPageFound from "./Componants/NoPageFound";
import CreateProducts from "./Componants/CreateProducts";
import ProductDetails from "./Componants/ProductDetails";
import { context } from "./Context/Store";
import { useContext, useEffect } from "react";
import Cart from "./Componants/Cart";
import SearchedProducts from "./Componants/SearchedProducts";
import HomePage from "./Componants/HomePage/HomePage";
import Mens from "./Componants/MensPage/Mens";
import Footer from "./SharedComponants/Footer";
import Womens from "./Componants/Womenspage/Womens";

function App() {
  const { getData, fetchUserData, loading } = useContext(context);

  useEffect(() => {
    getData();
    fetchUserData();
    
  }, [getData, fetchUserData]);

  return (
    <div>
      <NavBar />

      <div className="conatainer-fluid">


        <Routes>
          <Route path="*" element={<NoPageFound />} />
          <Route path="/" element={<HomePage />} />
          {/* <Route path='/products' element={<CategoryPage/>} /> */}
          <Route path="/user/register" element={<Registration />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/forgetpassword" element={<ForgetPassword />} />
          <Route path="/Searched/items" element={<SearchedProducts />} />
          <Route path="/Category/mens" element={<Mens/>} />
          <Route path="/Category/womens" element={<Womens/>} />
 
          <Route path="/user/resetpassword/:userId" element={<ResetPass />} />
          <Route path="/admin/portal" element={<CreateProducts />} />
          <Route path="/product/details/:productId" element={<ProductDetails />} />
          <Route path="/user/cart" element={<Cart />} />
        </Routes>


        
      </div>

       <Footer/>

    </div>
  );
}

export default App;
