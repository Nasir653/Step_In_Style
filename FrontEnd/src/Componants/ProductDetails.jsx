import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { context } from "../Context/Store";
import "./ProductDetails.css";
import { ToastContainer } from "react-toastify";

const ProductDetails = () => {
  const { productData, addToCart } = useContext(context);



  const { productId } = useParams();

  const product = productData.filter((item) => item._id === productId);
  

  return (



    <div className="container-fuild"> 
      
    

      {product.map((ele) => (
        <div key={ele._id} className="items">
          <img src={ele.imageUrl} alt="ele.title" className="img" />
          <div className="text">
            <h4>{ele.title}</h4>
            <h3>{ele.details}</h3>
            <h3>{ele.price}</h3>



            <button  onClick={ ()=> addToCart(ele._id) }>Add To Cart</button>
          </div>


        </div>
      ))}
    </div>
  );
};

export default ProductDetails;
