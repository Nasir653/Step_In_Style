import { createContext, useCallback, useState } from "react";
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
    UserData: [],
    AdminData: [],
    allProducts: [],
    productById: [],
    cart: [],
    AllCategories: [],
    SearchedItems: [],
    SuggestedItems: [],
    AllOrders: [],
    OrderById: [],
    AllUsers: [],
    Last30DaysUsers: [],
    OrderedProducts: [],

  });


  const registerHandler = async (e, formData) => {
    try {
      e.preventDefault();


      const res = await api.post("/user/register", formData)

      if (res.status === 200 && res.data.message === "Account Created Successfully") {
        toast.success(res.data.message);

        setTimeout(() => {

          navigate("/user/login")
        }, 1000)
      };

    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  const loginHandler = async (e, formData) => {
    try {

      setStore((prev) => ({ ...prev, loading: true }));
      e.preventDefault();

      const res = await api.post("/user/login", formData);



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

  const logout = async () => {
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

      const res = await api.post("/user/forgetpassword", { email: email });

      toast.success(res.data.message)


    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {

        toast.error(error.response.data.message);
      }
    }
  };



  const EditUser = useCallback(async (formData) => {
    try {

      setStore((prev) => ({ ...prev, loading: true }));


      const res = await api.post("/user/editUser", formData);


      toast.success(res.data.message);

    } catch (error) {
      console.error(error);
      toast.error("Error While Editing");
    } finally {
      setStore((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const ProfiePic = useCallback(async (form) => {
    try {
      console.log(form);
      setStore((prev) => ({ ...prev, loading: true }));


      const res = await api.post("/user/editUser", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message);

    } catch (error) {
      console.error(error);
      toast.error("Error uploading profile picture");
    } finally {
      setStore((prev) => ({ ...prev, loading: false }));
    }
  }, []);



  const editAddress = async (e, formData) => {
    e.preventDefault();
    try {
      const res = await api.post("/edit/user", formData);
      console.log("User updated successfully:", res);
      toast.success(res.data.success);
    } catch (error) {
      console.error("Error editing user:", error);

      if (error.response.status === 401) {
        return toast.error("All Feilds are Required");
      }
      toast.error("Something went wrong while updating user details.");
    }
  };


  const fetchAllProducts = useCallback(async () => {

    try {
      const res = await api.get(`/get/AllProducts`);
      setStore((prev) => ({ ...prev, allProducts: res.data.payload }));

    } catch (error) {
      console.log(error);

    }
  }, []);

  const getWomensProducts = useCallback(async (category, type) => {
    try {


      setStore((prev) => ({ ...prev, allProducts: [] }));
      const res = await api.get(`/getAllProducts/${category}/${type}`);


      setStore((prev) => ({ ...prev, allProducts: res.data.payload }));




    } catch (error) {
      console.log(error);
    }
  }, [])

  const getMensProducts = useCallback(async (category, type) => {
    try {

      setStore((prev) => ({ ...prev, allProducts: [] }));

      const res = await api.get(`/getAllProducts/${category}/${type}`);

      if (res.status === 200) {
        console.log("Fetched Products:", res.data.payload);
        setStore((prev) => ({ ...prev, allProducts: res.data.payload }));
      } else {
        console.log("No products found, setting empty array.");
        setStore((prev) => ({ ...prev, allProducts: [] }));
      }
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  }, [setStore]);


  const getTrendingProducts = useCallback(async (category) => {

    try {
      const res = await api.get(`/get/newCollection/${category}`);

      setStore((prev) => ({ ...prev, TrendingProducts: res.data.payload }));


    } catch (error) {
      console.log("Server Error");

    }


  }, [])


  const getNewCollection = useCallback(async (category) => {

    try {

      const res = await api.get(`/get/newCollection/${category}`);

      setStore((prev) => ({ ...prev, NewCollection: res.data.payload }));


    } catch (error) {
      console.log("Server Error");

    }
    finally {

    }

  }, []);


  const ProductDetails = async (ProductId) => {
    try {
      const res = await api.get(
        `/getProductById/${ProductId}`
      );
      setStore((prev) => ({ ...prev, productById: res.data.payload }));

    } catch (error) {
      console.log(Error);
    }
  };

  const addToCart = async (productId, formData) => {

    try {


      setStore((prev) => ({ ...prev, loading: true }));

      if (formData.size === "") {
        return toast.error("Choose size");
      }

      if (formData.color === "") {
        return toast.error("Choose Color");
      }

      const res = await api.post(`/user/cart/${productId}`, formData);

      toast.success(res.data.message);

    } catch (error) {

      console.log(error);
    }
    finally {
      setStore((prev) => ({ ...prev, loading: false }));
    }

  }

  const fetchCartItems = useCallback(async () => {
    try {
      const res = await api.get("/user/fetch/cartItems");
      setStore((prev) => ({ ...prev, cart: res.data.payload }));
    } catch (error) {
      console.log(error); // This will log the actual error object


    }
  }, []);


  const removeFromCart = async (productId) => {

    try {
      setStore((prev) => ({ ...prev, loading: true }));
      const res = await api.get(`/user/remove/cartItems/${productId}`)
      toast.success(res.data.message);

    } catch (error) {

      console.log(error);

    }

    finally {
      setStore((prev) => ({ ...prev, loading: false }));
    }



  }

  const Order = async (productId, formData) => {
    try {

      const res = await api.post(`/user/create/order?productId=${productId}`, formData);


      if (res.status === 200 || res.status === 201) {
        setTimeout(() => {
          toast.success(res.data.message || "Order created successfully")


        }, 1000);

        navigate(`/Order/OrderDetails/${res.data.payload._id}`);


      } else {
        toast.warn("Unexpected response from the server");
      }

      console.log(res);
    } catch (error) {

      if (error.response) {
        const status = error.response.status;
        const message = error.response.data.message || "Something went wrong";

        if (status === 401) {
          toast.error("Unauthorized! Please login again");
        } else if (status === 404) {
          toast.error("Resource not found");
        } else if (status === 400) {
          toast.error(message);
          navigate("/user/addDetails");
        } else if (status === 500) {
          toast.error("Server error. Please try again later");
        } else {
          toast.error(message);
        }
      } else if (error.request) {

        console.log("Error Request:", error.request);
        toast.error("No response from the server. Please check your connection.");
      } else {

        console.log("Error Message:", error.message);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };



  const fetchOrderBtyId = useCallback(

    async (orderId) => {
      try {

        const res = await api.get(`user/OrderById/${orderId}`);


        setStore((prev) => ({ ...prev, OrderById: res.data.payload }));

      } catch (error) {

        console.log(error);

      }
    },


    []);

  const UserCancelOrder = async (OrderId) => {
    try {

      const res = await api.get(`/user/CancelOrder/${OrderId}`)
      toast.success(res.data.message || "Order Cancelled successfully")


    } catch (error) {

      console.log(error);
    }
  }

  const SearchInput = async (value) => {
    try {
      const res = await api.post(`/product/search/${value}`);

      if (res) {

        if (res.data.payload && res.data.payload.length > 0) {

          setStore((pre) => ({ ...pre, SearchedItems: res.data.payload }));
          navigate("/Searched/items");
        } else {

          setStore((pre) => ({ ...pre, SearchedItems: [] }));
          navigate("/Searched/items");
        }
      }
    } catch (error) {
      console.log("Server Error: ", error);


      if (error.response) {

        if (error.response.status === 404) {

          setStore((pre) => ({ ...pre, SearchedItems: [] }));
          navigate("/Searched/items");
        } else {

          setStore((pre) => ({ ...pre, SearchedItems: [] }));
          navigate("/Searched/items");
        }
      } else {
        // In case of network or other issues
        console.error("Error details: ", error);
        setStore((pre) => ({ ...pre, SearchedItems: [] }));
        navigate("/Searched/items");
      }
    }
  };

  const SuggestedProducts = async (value) => {

    try {

      const res = await api.get(`/user/SuggestedItems/${value}`);
      setStore((prev) => ({ ...prev, SuggestedItems: res.data.payload }));


    } catch (error) {
      console.log(error);
    }
  }

  const UserBlogs = async (formData) => {
    try {

      const res = await api.post("/user/Blogs", formData)

      toast.success(res.data.message);

    } catch (error) {
      console.log(error);


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


      e.preventDefault();


      const res = await api.post("/admin/login", formData);



      if (res.status === 200 && res.data.message === "Login Successfully") {
        toast.success(res.data.message);
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

    }
  };

  const EditProducts = async (productId, formData) => {

    try {

      const res = await api.put(`/admin/editProducts/${productId}`, formData);


      toast.success(res.data.message);

    } catch (error) {
      console.log("Server Error");

    }
    finally {

    }
  }

  const EditNewCollection = async (formData, productId) => {


    try {


      const res = await api.put(`/ admin / edits / newCollection / ${productId}`, formData);


      toast.success(res.data.message);

    } catch (error) {
      console.log("Server Error");

    }
    finally {

    }
  }

  const deleteAndActiveProducts = async (productId, status) => {
    try {
      const res = await api.delete(`/admin/delete/products/${productId}?status=${status}`);
      toast.success(res.data.message);
    } catch (error) {
      console.error("Server Error:", error);
      toast.error("Failed to update product status");
    }
  };

  const addNewCategory = async (e, formData) => {

    try {

      e.preventDefault();
      const res = await api.post("/create/newCategory", formData);

      console.log(res);


      toast.success(res.data.message);
    } catch (error) {

      console.log(error);

    }
  }

  const fetchAllOrders = async () => {
    try {

      const res = await api.get("/fetch/allOrders");
      setStore((prev) => ({ ...prev, AllOrders: res.data.payload }));

    } catch (error) {
      console.log(error);

    }
  }

  const editNewCategory = useCallback(async (e, formData, categoryId) => {

    try {
      setStore((prev) => ({ ...prev, loading: true }));

      e.preventDefault();
      const res = await api.post(`/admin/Creates/newCategory/${categoryId}`, formData);
      console.log(res);




      toast.success(res.data.message);

    } catch (error) {
      console.log("Server Error");

    }
    finally {
      setStore((prev) => ({ ...prev, loading: false }));
    }
  }, []
  )

  const DeleteCategories = async (CategoryId) => {

    try {

      const res = await api.delete(`/admin/deleteCategory?categoryId=${CategoryId}`);
      toast.success(res.data.message);

    } catch (error) {
      console.log(error);


    }

  }

  const fetchNewCategory = async () => {
    try {


      const res = await api.get("/fetch/allNewCatwgory");


      setStore((prev) => ({ ...prev, AllCategories: res.data.payload }));



    } catch (error) {
      console.log("Server Error");

    }



  }

  const fetchAllUsers = async () => {
    try {
      const res = await api.get("/fetch/allUSers");
      setStore((prev) => ({ ...prev, AllUsers: res.data.payload }));

    } catch (error) {
      console.log(error);

    }
  }
  const getLastMonthsUsers = async () => {
    try {
      const res = await api.get("/fetch/lastMonthsUser");
      setStore((prev) => ({ ...prev, Last30DaysUsers: res.data.payload }));

    } catch (error) {
      console.log(error);

    }
  }

  const AdminCancelOrder = async (OrderId) => {
    try {

      const res = await api.get(`/user/CancelOrder/${OrderId}`)
      toast.success(res.data.message || " This Order is Cancelled successfully")

    } catch (error) {

      console.log(error);
    }
  }

  const DispatchOrder = async (orderId) => {
    try {
      console.log(orderId);

      const res = await api.get(`/dispatch/order?orderId=${orderId}`);

      toast.success(res.data.message);

    } catch (error) {

      console.log(error);

    }
  }

  return (
    <context.Provider
      value={{
        ...store,
        registerHandler,
        loginHandler,
        ResetLink,
        EditUser,
        CreateProducts,
        EditProducts,
        fetchAllProducts,
        ProductDetails,
        fetchUserData,
        addToCart,
        fetchCartItems,
        removeFromCart,
        SearchInput,
        SuggestedProducts,
        logout,
        ProfiePic,
        editAddress,
        getWomensProducts,
        adminSignUp,
        adminLogin,
        getMensProducts,
        getNewCollection,
        getTrendingProducts,
        addNewCategory,
        editNewCategory,
        DeleteCategories,
        fetchNewCategory,
        EditNewCollection,
        deleteAndActiveProducts,
        Order,
        fetchAllOrders,
        fetchOrderBtyId,
        UserCancelOrder,
        getLastMonthsUsers,
        AdminCancelOrder,
        DispatchOrder,
        UserBlogs,
        fetchAllUsers,


      }}
    >
      <App />
    </context.Provider>
  );
};

export default Store;
