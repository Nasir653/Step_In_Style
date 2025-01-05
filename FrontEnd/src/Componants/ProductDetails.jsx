import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { context } from "../Context/Store";
import "./ProductDetails.scss";


const ProductDetails = () => {
  const { productById, addToCart, ProductDetails } = useContext(context);

  let pro = [];
  pro.push(productById);


  const { productId } = useParams();



  useEffect(() => {
    ProductDetails(productId);


  }, []);



  return (



    <div className="container-fuild">



      {pro.map((ele) => (
        <div key={ele._id} className="productDetails-items">
          <img src={ele.imageUrl} alt="ele.title" className="img" />
          <div className="text">
            <h4>{ele.title}</h4>
            <h3>{ele.details}</h3>
            <h3>{ele.price}</h3>



            <button onClick={() => addToCart(ele._id)}>Add To Cart</button>
          </div>


        </div>
      ))}
    </div>
  );
};

export default ProductDetails;
