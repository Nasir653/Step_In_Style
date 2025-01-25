import React, { useContext, useState, useEffect } from 'react';
import { context } from '../Context/Store';
import './Cart.scss';

const Cart = () => {
  const { cart, removeFromCart, Order } = useContext(context);
  const [quantities, setQuantities] = useState(
    cart.reduce((acc, item) => {
      acc[item._id] = item.qty;
      return acc;
    }, {})
  );
  const [grandTotal, setGrandTotal] = useState(0);

  // Update grand total when cart or quantities change
  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => acc + item.price * (quantities[item._id] || item.qty),
      0
    );
    setGrandTotal(total);
  }, [cart, quantities]);

  const handleQuantityChange = (id, delta) => {
    setQuantities((prevQuantities) => {
      const updatedQty = Math.max(1, (prevQuantities[id] || 1) + delta);
      return { ...prevQuantities, [id]: updatedQty };
    });
  };

  const handleOrder = (e, product) => {
    e.preventDefault();

    // Prepare formdata with updated quantity and other required fields
    const formdata = {
      color: product.color,
      size: product.size,
      qty: quantities[product._id],
      price: product.price * quantities[product._id],
    };

    // Call the Order function and pass the formdata
    Order(product.productId._id, formdata);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length > 0 ? (
        <div>
          <div className="cart-items">
            {cart.map((ele) => (
              <div key={ele._id} className="cart-item">
                <img
                  src={ele.productId.imageUrl}
                  alt={ele.productId.title}
                  className="item-img"
                />
                <div className="item-details">
                  <h4>{ele.productId.title}</h4>
                  <p>Details: {ele.details}</p>
                  <p>Price: ₹{ele.price}</p>
                  <p>Color: {ele.color}</p>
                  <p>Size: {ele.size}</p>
                  <div className="quantity-update">
                    <label>Quantity:</label>
                    <div className="quantity-controls">
                      <button
                        onClick={() => handleQuantityChange(ele._id, -1)}
                        disabled={(quantities[ele._id] || ele.qty) <= 1}
                      >
                        -
                      </button>
                      <span>{quantities[ele._id] || ele.qty}</span>
                      <button onClick={() => handleQuantityChange(ele._id, 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <p className="total-price">
                    Total: ₹<span>{ele.price * (quantities[ele._id] || ele.qty)}</span>
                  </p>
                  <div className="actions">
                    <button
                      className="btn-primary"
                      onClick={(e) => handleOrder(e, ele)}
                    >
                      Place Order
                    </button>
                    <button
                      className="btn-secondary"
                      onClick={() => removeFromCart(ele._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Grand Total: ₹{grandTotal}</h3>
          </div>
        </div>
      ) : (
        <p className="empty-cart">Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
