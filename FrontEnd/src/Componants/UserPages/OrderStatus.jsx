import React, { useContext, useEffect, useState } from "react";
import { context } from "../../Context/Store";
import { useNavigate } from "react-router-dom";
import "./OrderStatus.scss";

const OrderStatus = () => {
    const { UserData, UserCancelOrder } = useContext(context);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (UserData?.orders) {
            setOrders(UserData.orders);
        }
    }, [UserData]);

    if (!orders || orders.length === 0) {
        return (
            <div className="order-status-container">
                <h1>No Orders Found</h1>
                <p>You have no orders in your account.</p>
            </div>
        );
    }

    const handleCancelOrder = async (orderId) => {
        try {
            await UserCancelOrder(orderId); // Call cancel order function

            // 🛠️ Update order status instead of removing
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId ? { ...order, orderStatus: "Cancelled" } : order
                )
            );
        } catch (error) {
            console.error("Error canceling order:", error);
        }
    };

    const handleViewDetails = (orderId) => {
        console.log(`View details for order ID: ${orderId}`);
        navigate(`/Order/OrderDetails/${orderId}`);
    };

    return (
        <div className="order-status-container">
            <h1>My Orders</h1>
            {orders.map((order) => (
                <div key={order._id} className="order-card">
                    <div className="order-header">
                        <h3>Order ID: {order._id}</h3>
                        <p>Placed On: {new Date(order.OrderDate).toLocaleString()}</p>
                    </div>

                    <p>Status: <strong>{order.orderStatus || "Pending"}</strong></p>

                    <div className="order-products">
                        {order.products?.map((product, index) => (
                            <div key={index} className="product-details" onClick={() => navigate(`/product/details/${product.productId._id}`)}>
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
                        <button
                            className="cancel-order-button"
                            onClick={() => handleCancelOrder(order._id)}
                            disabled={order.orderStatus === "Cancelled"}
                        >
                            {order.orderStatus === "Cancelled" ? "Order Cancelled" : "Cancel Order"}
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
