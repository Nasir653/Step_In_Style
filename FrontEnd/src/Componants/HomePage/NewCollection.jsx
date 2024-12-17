import React, { useContext } from "react";
import { context } from "../../Context/Store";
import { useNavigate } from "react-router-dom";
import "./NewCollection.scss";

const NewCollection = () => {
  const { productData } = useContext(context);
  const navigate = useNavigate();


  const data = productData.filter((ele) => ele.category === "New Collection");

  return (
    <div>


      <div className="New-collection">
        <h1>New Collections</h1>
        <div className="New_Collections">
          {data &&
            data.map((product) => (
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
