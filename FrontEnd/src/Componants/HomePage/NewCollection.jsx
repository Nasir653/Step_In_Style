import React, { useContext, useEffect } from "react";
import { context } from "../../Context/Store";
import { useNavigate } from "react-router-dom";
import "./NewCollection.scss";

const NewCollection = () => {
  const { NewCollection, getNewCollection } = useContext(context);
  const navigate = useNavigate();

  useEffect(() => {
    getNewCollection("New Collection");
  }, []);

  return (


    <>


      <div className="New-collection">

        <h1>New Collections</h1>
        <div className="New_Collections">

          {NewCollection &&
            NewCollection.map((product) => (

              <div
                key={product._id}
                className="items"
                onClick={() => {
                  navigate(`/product/details/${product._id}`);
                }}
              >

                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="coll-img"
                />
                <span className="product-title">{product.title}</span>
                <span className="product-price">INR: {product.price}</span>
                <span className="product-sizes"> {product.sizes}</span>
              </div>
            ))}
        </div>
      </div>


    </>
  );
};

export default NewCollection;
