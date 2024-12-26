import React, { useContext, useEffect } from "react";
import { context } from "../../Context/Store";
import { useNavigate } from "react-router-dom";
import "./NewCollection.scss";

const NewCollection = () => {
  const { allProducts, getNewCollection, } = useContext(context);
  const navigate = useNavigate();

  console.log(allProducts);

  useEffect(() => {
    getNewCollection("New Collection");
  }, []);

  return (
    <div>


      <div className="New-collection">
        <h1>New Collections</h1>
        <div className="New_Collections">
          {allProducts &&
            allProducts.map((product) => (
              <div
                className="items"
                onClick={(e) => {
                  navigate(`/product/details/${product._id}`);

                }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="coll-img"
                />

                <span> {product.title} </span>

                <span> INR : {product.price} </span>
              </div>
            ))}
        </div>


      </div>
    </div>
  );
};

export default NewCollection;
