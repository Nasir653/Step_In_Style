import React, { useContext } from "react";
import { context } from "../../Context/Store";
import { useNavigate } from "react-router-dom";
import "./OrderStatus.scss";

const OrderStatus = () => {
    const { UserData } = useContext(context);
    const navigate = useNavigate();





    if (!UserData || !UserData.orders || UserData.orders.length === 0) {
        return (
            <div className="order-status-container">
                <h1>No Orders Found</h1>
                <p>You have no orders in your account.</p>
            </div>
        );
    }

    const handleCancelOrder = (orderId) => {
        console.log(`Cancel order with ID: ${orderId}`);

    };

    const handleViewDetails = (orderId) => {
        console.log(`View details for order ID: ${orderId}`);
        navigate(`/Order/OrderDetails/${orderId}`);
    };

    return (
        <div className="order-status-container">
            <h1>My Orders</h1>
            {UserData.orders.map((order) => (
                <div key={order._id} className="order-card">
                    <div className="order-header">
                        <h3>Order ID: {order._id}</h3>
                        <p>Placed On: {new Date(order.OrderDate).toLocaleString()}</p>
                    </div>

                    {order.orderStatus === "Confirmed" ? "Order Placed" :
                        order.orderStatus === "Cancelled" ? "Order Cancelled" :
                            order.orderStatus === "Shipped" ? "Order Shipped" :
                                order.orderStatus === "Out for Delivery" ? "Out for Delivery" :
                                    order.orderStatus === "Delivered" ? "Order Delivered" :
                                        order.orderStatus === "Returned" ? "Order Returned" :
                                            "Processing"}
                    <div className="order-products">
                        {order.products?.map((product, index) => (
                            <div key={index} className="product-details" onClick={(e) => { navigate(`/product/details/${product.productId._id}`) }}>
                                <img
                                    src={product.productId.imageUrl}
                                    alt={product.productId.title}
                                    className="product-image"
                                />
                                <div className="product-info">
                                    <p><strong>{product.productId.title}</strong></p>
                                    <p>Qty: {product.qty}</p>
                                    <p>Color: {product.color}</p>
                                    <p>Size: {product.size}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="order-footer">
                        <p>Total Amount: <strong>₹{order.totalAmount}</strong></p>
                        <p>Status: <strong>{order.status || "Pending"}</strong></p>
                        <button
                            className="cancel-order-button"
                            onClick={() => handleCancelOrder(order._id)}
                        >
                            Cancel Order
                        </button>
                        <button
                            className="view-details-btn"
                            onClick={() => handleViewDetails(order._id)}
                        >
                            View Details
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderStatus;
