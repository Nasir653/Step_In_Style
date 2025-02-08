import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { context } from "../../Context/Store";
import "./ProductDetails.scss";
import SuggestedPro from "./SuggestedPro";

const ProductDetails = () => {

  const navigate = useNavigate();
  const { productById, addToCart, ProductDetails, SuggestedProducts } = useContext(context);
  const { productId } = useParams();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productId) {
      ProductDetails(productId);
    }
  }, [productId]);


  useEffect(() => {
    if (productById && productById.type) {
      SuggestedProducts(productById.type);
      console.log(productById);

    }
  }, [productById]);


  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleQuantityChange = (action) => {
    setQuantity((prevQuantity) =>
      action === "increment" ? prevQuantity + 1 : Math.max(1, prevQuantity - 1)
    );
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      return alert("Please select a size.");
    }
    if (!selectedColor) {
      return alert("Please select a color.");
    }

    const cartItem = {
      size: selectedSize,
      color: selectedColor,
      quantity,
    };

    addToCart(productById._id, cartItem);

    // navigate("/user/cart");
  };

  return (

    <>
      <div className="container-fuild">
        {productById && (
          <div key={productById._id} className="productDetails-items">
            <img src={productById.imageUrl} alt={productById.title} className="img" />
            <div className="text">
              <h4>{productById.title}</h4>
              <h3>{productById.details}</h3>
              <h3>{productById.price} INR</h3>
              <div className="size-options">
                <span>Size:</span>
                <div className="size-buttons">
                  {productById.sizes &&
                    productById.sizes.split(",").map((size, index) => (
                      <button
                        key={index}
                        className={`size-button ${selectedSize === size ? "selected" : ""}`}
                        onClick={() => handleSizeChange(size)}
                      >
                        {size}
                      </button>
                    ))}
                </div>
              </div>


              <div className="color-options">
                <span>Color:</span>
                <div className="color-swatch-container">
                  {productById.colors &&
                    productById.colors.split(",").map((color, index) => (
                      <div
                        key={index}
                        className={`color-swatch ${selectedColor === color ? "selected" : ""
                          }`}
                        onClick={() => handleColorChange(color)}
                        style={{
                          backgroundColor: color.toLowerCase(),
                          cursor: "pointer",
                        }}
                      ></div>
                    ))}
                </div>
              </div>


              <div className="quantity-options">
                <span>Quantity:</span>
                <div className="quantity-controls">
                  <button
                    className="decrement-button"
                    onClick={() => handleQuantityChange("decrement")}
                  >
                    -
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button
                    className="increment-button"
                    onClick={() => handleQuantityChange("increment")}
                  >
                    +
                  </button>
                </div>
              </div>

              {productById.status === "Active" ?

                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize || !selectedColor}
                  className="add-to-cart-button"
                >
                  Add To Cart
                </button> :
                <button

                  disabled={!selectedSize || !selectedColor}
                  className="add-to-cart-button"
                >
                  Out of Order
                </button>

              }
            </div>
          </div>


        )}

      </div>

      <div className="suggestedItems">

        <SuggestedPro />
      </div>




    </>

  );



};


export default ProductDetails;
