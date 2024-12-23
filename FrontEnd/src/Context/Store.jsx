import { createContext, useCallback, useEffect, useState } from "react";
import App from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../utils/ApiInstances";


export const context = createContext();

const Store = () => {
  const navigate = useNavigate();

  const [store, setStore] = useState({

    loading: false,
    LogedInn: false,
    UserData: [],
    AdminData: [],
    allProducts: [],
    cart: [],
    Womensproducts: [],
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


    } catch (error) {
      console.error(error);
    }
  };

  const loginHandler = async (e, formData) => {
    try {

      setStore((prev) => ({ ...prev, loading: true }));
      e.preventDefault();

      const url = "/user/login";
      const res = await api.post(url, formData);



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

    finally {
      setStore((prev) => ({ ...prev, loading: false }));
    }
  };

  const logout = useCallback(async () => {
    try {

      setStore((prev) => ({ ...prev, loading: true }));
      const res = await api.get("/user/logout");

      toast.success(res.data.message);

      navigate("/");

    } catch (error) {

      console.error("Logout error:", error);
      toast.error("Something went wrong! Try again later.");
    }

    finally {
      setStore((prev) => ({ ...prev, loading: false }));
    }

  }, []);

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


    } catch (error) {
      console.log(error);
    }
  };


  const ProfiePic = async (form) => {
    try {



      const res = await api.post("/user/profilePic", form)

      toast.success(res.data.message)



    } catch (error) {
      console.log(error);

    }

  }


  const CreateProducts = async (e, fileUpload) => {
    try {
      e.preventDefault();

      const url = "http://localhost:4000/admin/createProducts";
      const res = await axios.post(url, fileUpload);



      if (res) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      //toast.error(res.data.message);
    }
  };


  const CreateWomensProducts = async (e, fileUpload) => {
    try {
      e.preventDefault();


      const res = await api.post("/admin/create/womensProducts", fileUpload);



      if (res) {
        toast.success(res.data.message);
      }

      else {
        toast.error(res.data.message);

      }
    } catch (error) {
      console.log(error);
      //toast.error(res.data.message);
    }
  };



  const getWomensProducts = useCallback(async () => {
    try {

      const res = await api.get("/fetch/womensProducts");

      if (res.status === 200) {
        setStore((prev) => ({ ...prev, Womensproducts: res.data.payload }));

      }


    } catch (error) {
      console.log(error);
    }
  }, [])

  const getData = useCallback(async (Shirts) => {
    try {
    
      const res = await api.get(`/getProducts/${Shirts}`);

      
      setStore((prev) => ({ ...prev, allProducts: res.data.getData }));

    } catch (error) {
      console.log(error);
    }
  }, [])



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


      toast.success(res.data.message);
      toast.error(res.response.data.message);

    } catch (error) {

      console.log(error);

    }


  }


  const fetchCartItems = useCallback(async () => {

    try {

      const res = await api.get("/user/fetch/cartItems");

      setStore((prev) => ({ ...prev, cart: res.data.payload }));

    } catch (error) {
      console.log(Error);


    }


  }
    , []);

  const removeFromCart = async (productId) => {

    try {

      const res = await api.get(`/user/remove/cartItems/${productId}`)

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


  //  Admin Api's


  const adminSignUp = async (e, formData) => {
    try {
      e.preventDefault();

      const response = await api.post("/admin/signup", formData);
      toast.success(response.data.message);


    } catch (error) {
      console.error(error);
    }
  };

  const adminLogin = async (e, formData) => {

    try {

      setStore((prev) => ({ ...prev, loading: true }));
      e.preventDefault();


      const res = await api.post("/admin/login", formData);



      if (res.status === 200 && res.data.message === "Login Successfully") {
        toast.success(res.data.message);
        setStore((prev) => ({ ...prev, loading: true }));
        setStore((prev) => ({ ...prev, AdminData: res.data.payload }));
        navigate("/admin");

      }

      else {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }

    finally {
      setStore((prev) => ({ ...prev, loading: false }));
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
        logout,
        ProfiePic,
        CreateWomensProducts,
        getWomensProducts,
        adminSignUp,
        adminLogin,
      }}
    >
      <App />
    </context.Provider>
  );
};

export default Store;
