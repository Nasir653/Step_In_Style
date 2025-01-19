import React, { useContext } from 'react';
import { context } from '../Context/Store';
import './Cart.scss';

const Cart = () => {
  const { cart, removeFromCart, Order } = useContext(context);

  const handleOrder = (e, product) => {
    e.preventDefault();

    // Prepare formdata with required fields
    const formdata = {
      color: product.color,
      size: product.size,
      qty: product.qty,
      price: product.price,
    };

    // Call the Order function and pass the formdata
    Order(product.productId._id, formdata);
  };

  return (
    <div className="cart">
      {cart.length > 0 ? (
        cart.map((ele) => (
          <div key={ele._id} className="items">
            <img
              src={ele.productId.imageUrl}
              alt={ele.productId.title}
              className="img"
            />
            <div className="text">
              <h4>{ele.productId.title}</h4>
              <h3>{ele.details}</h3>
              <h3>Price: {ele.price}</h3>
              <h3>Color: {ele.color}</h3>
              <h3>Size: {ele.size}</h3>
              <h3>Qty: {ele.qty}</h3>

              <button onClick={(e) => handleOrder(e, ele)}>Place Order</button>
              <button onClick={() => removeFromCart(ele._id)}>Remove</button>
            </div>
          </div>
        ))
      ) : (
        <p>Cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
