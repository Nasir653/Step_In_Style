import { createContext, useCallback, useEffect, useState } from "react";
import App from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../utils/ApiInstances";
import Cookies from "js-cookie";


export const context = createContext();

const Store = () => {
  const navigate = useNavigate();

  const [store, setStore] = useState({
    loading: false,
    LogedInn: false,
    UserData: [],
    productData: [],
    cart: [],
    SearchedItems: []

  });


  useEffect(() => {
    console.log(store);
  }, [store]);



  const registerHandler = async (e, formData) => {
    try {
      e.preventDefault();
      const url = "http://localhost:4000/user/register";

      const response = await axios.post(url, formData);
      toast.success(response.data.message);
      console.log(response);

    } catch (error) {
      console.error(error);
    }
  };

  const loginHandler = async (e, formData) => {
    try {
      e.preventDefault();

      const url = "/user/login";
      const res = await api.post(url, formData);

      console.log(res);

      if (res.status === 200 && res.data.message === "Login Successfully") {
        //toast.success(res.data.message);
        setStore((prev) => ({ ...prev, loading: true }));
        navigate("/");
         
      }
      
    
      
      else {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
     
      const res = await api.get("/user/logout");

      toast.success(res.data.message);

      navigate("/");
    } catch (error) {
    
      console.error("Logout error:", error);
      toast.error("Something went wrong! Try again later.");
    }
  };

  const fetchUserData = useCallback(async () => {
    try {
      
      const res = await api.get("/fetch/user");
      setStore((prev) => ({ ...prev, UserData: res.data.payload }));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const ResetLink = async (e, email) => {
    e.preventDefault();
    try {
      const url = "http://localhost:4000/user/forgetpassword";

      const res = await axios.post(url, { email: email });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const CreateProducts = async (e, fileUpload) => {
    try {
      e.preventDefault();

      const url = "http://localhost:4000/admin/createProducts";
      const res = await axios.post(url, fileUpload);

      console.log(res);

      if (res) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      //toast.error(res.data.message);
    }
  };

  const getData = useCallback(async () => {
    try {
      const url = "http://localhost:4000/getProducts";
      const res = await axios.get(url);
      setStore((prev) => ({ ...prev, productData: res.data.getData }));

    } catch (error) {
      console.log(error);
    }
  },[] )



  const ProductDeatail = async (ProductId) => {
    try {
      const response = await api.get(
        `product/details/${ProductId}`
      );
      return response

    } catch (error) {
      console.log(Error);
    }
  };


  const addToCart = async (productId) => {


    try {

      const res = await api.get(`/user/cart/${productId}`);
      console.log(res);

      toast.success(res.data.message);
      toast.error(res.response.data.message);

    } catch (error) {

      console.log(error);

    }


  }


  const fetchCartItems = async () => {

    try {

      const res = await api.get("/user/fetch/cartItems");
      console.log(res);
      setStore((prev) => ({ ...prev, cart: res.data.payload }));



    } catch (error) {
      console.log(Error);


    }


  }

  const removeFromCart = async (productId) => {

    try {



      const res = await api.get(`/user/remove/cartItems/${productId}`)

      console.log(res);

    } catch (error) {

      console.log(error);

    }


  }


  const SearchInput = async (value) => {

    try {


      console.log("value " + value);

      const res = await api.post(`/product/search/${value}`);


      if (res) {
        navigate("/Searched/items");

        setStore((pre) => ({ ...pre, SearchedItems: res.data.payload }))

      }

    } catch (error) {

      console.log("Server Error" + Error);

    }


  }


  return (
    <context.Provider
      value={{
        ...store,
        registerHandler,
        loginHandler,
        ResetLink,
        CreateProducts,
        ProductDeatail,
        getData,
        fetchUserData,
        addToCart,
        fetchCartItems,
        removeFromCart,
        SearchInput,
        logout
      }}
    >
      <App />
    </context.Provider>
  );
};

export default Store;
