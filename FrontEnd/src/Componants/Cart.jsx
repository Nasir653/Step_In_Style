import React, { useContext } from 'react'
import { context } from '../Context/Store'
import "./Cart.scss";

const Cart = () => {

  const { cart, removeFromCart } = useContext(context);



  return (



    <div className='cart'>


      {cart.length > 0 ? (cart.map((ele) => (

        <div className="items">

          <img src={ele.imageUrl} alt="ele.title" className="img" />

          <div className="text">
            <h4>{ele.title}</h4>
            <h3>{ele.details}</h3>
            <h3>{ele.price}</h3>



            <button>Place Order</button>
            <button onClick={() => removeFromCart(ele._id)}>Remove</button>
          </div>




        </div>



      ))) : ( <p>Empty</p>)


      }



    </div>



  )
}

export default Cart