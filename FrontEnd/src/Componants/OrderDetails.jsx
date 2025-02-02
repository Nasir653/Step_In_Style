import React, { useContext, useEffect, useState } from "react";
import "./OrderDetails.scss";
import { useParams } from "react-router-dom";
import { context } from "../Context/Store";

const OrderDetails = () => {
    const { UserData, DispatchOrder } = useContext(context);
    const { OrderId } = useParams();

    const [order, setOrder] = useState(null);

    useEffect(() => {
        const currentOrder = UserData?.orders?.find((o) => o._id === OrderId);
        setOrder(currentOrder);
    }, [OrderId, UserData]);

    if (!order) {
        return (
            <div className="order-details-container">
                <h1>Order Not Found</h1>
                <p>We couldn't find any details for this order.</p>
            </div>
        );
    }

    const handleCancelOrder = (productId) => {
        alert(`Order for product ${productId} has been canceled.`);
    };

    const handleDispatchOrder = () => {
        if (order.orderStatus !== "Confirmed") {
            DispatchOrder(OrderId);


            setOrder((prevOrder) => ({
                ...prevOrder,
                orderStatus: "Confirmed",
            }));
        }
    };

    return (
        <div className="order-details-container">
            <h1>Order Details</h1>

            <div className="order-info">
                <h2>Order ID: {order._id}</h2>
                <p>Placed On: {new Date(order.OrderDate).toLocaleString()}</p>
                <p>Shipping Time: {new Date(order.shippingTime).toLocaleString()}</p>
                <p>Total Amount: ₹{order.totalAmount}</p>
                <p>Status: {order.isPaymentDone ? "Paid" : "Pending Payment"}</p>
            </div>

            <div className="shipping-address">
                <h2>Shipping Address</h2>
                <p><strong>Name:</strong> {order.address[0]?.fullname}</p>
                <p><strong>Street:</strong> {order.address[0]?.street}</p>
                <p><strong>District:</strong> {order.address[0]?.district}</p>
                <p><strong>State:</strong> {order.address[0]?.state}</p>
                <p><strong>Pincode:</strong> {order.address[0]?.pincode}</p>
                <p><strong>Landmark:</strong> {order.address[0]?.landmark}</p>
                <p><strong>Contact:</strong> {order.address[0]?.contact}</p>
            </div>

            <div className="order-products">
                <h2>Products in this Order</h2>
                {order.products.map((product) => (
                    <div key={product._id} className="product-card">
                        <img
                            src={product.productId.imageUrl}
                            alt={product.productId.title}
                            className="product-image"
                        />
                        <div className="product-info">
                            <h3>{product.productId.title}</h3>
                            <p><strong>Price:</strong> ₹{product.price}</p>
                            <p><strong>Quantity:</strong> {product.qty}</p>
                            <p><strong>Color:</strong> {product.color}</p>
                            <p><strong>Size:</strong> {product.size}</p>
                        </div>

                        <div className="product-card-btns">
                            {UserData?.IsAdmin && (
                                <button
                                    className={`dispatch-order-btn ${order.orderStatus === "Confirmed" ? "dispatched" : ""}`}
                                    onClick={handleDispatchOrder}
                                    disabled={order.orderStatus === "Confirmed"}
                                >
                                    {order.orderStatus === "Confirmed" ? "Confirmed" : "Dispatch Order"}
                                </button>
                            )}
                            <button
                                className="cancel-order-btn"
                                onClick={() => handleCancelOrder(product.productId._id)}
                            >
                                Cancel Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderDetails;
