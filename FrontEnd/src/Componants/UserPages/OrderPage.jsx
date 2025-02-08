import React, { useContext, useEffect, useState } from "react";
import { context } from "../../Context/Store";
import { useParams } from "react-router-dom";
import "./OrderPage.scss";

const OrderPage = () => {
    const { fetchOrderBtyId, UserCancelOrder, editAddress, UserData, Order, cart } = useContext(context);
    const { OrderId, productId } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedAddress, setEditedAddress] = useState(null);

    const items = cart.filter((ele) => ele._id === productId);

    const handleEditClick = (address) => {
        setIsEditing(true);
        setEditedAddress(address);
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setEditedAddress({ ...editedAddress, [name]: value });
    };

    const handleSaveAddress = (e) => {
        editAddress(e, editedAddress);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedAddress(null);
    };

    const handleConfirmOrder = () => {
        setIsModalOpen(true);
    };

    const handleOrdernow = (address) => {
        if (items.length === 0) {
            alert("No products available for ordering.");
            return;
        }

        // Calculate total amount in paise (Razorpay uses paise)
        const totalAmount = items.reduce((total, product) => total + product.price * product.qty, 0) * 100;

        // Razorpay options
        const options = {
            key: "rzp_test_Z36WCdNzfS0d1c", // Your Razorpay test key
            amount: totalAmount, // Amount in paise
            currency: "INR",
            name: "Step in Style",
            description: "Order Payment",
            handler: function (response) {
                console.log("Payment Success:", response);

                // If payment is successful, place the order
                items.forEach((product) => {
                    const formData = {
                        color: product.color,
                        size: product.size,
                        qty: product.qty,
                        price: product.price,
                        addressId: address._id,
                        paymentId: response.razorpay_payment_id, // Store payment ID
                    };

                    Order(product.productId._id, formData);
                });

                alert("Payment Successful! Your order has been placed.");
            },
            prefill: {
                name: UserData?.name,
                email: UserData?.email,
                contact: UserData?.contact,
            },
            theme: {
                color: "#F37254",
            },
        };

        // Check if Razorpay is loaded
        if (!window.Razorpay) {
            alert("Razorpay SDK not loaded. Please check your connection.");
            return;
        }

        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
    };

    const handleClosePopup = () => {
        setIsModalOpen(false);
    };

    if (items.length === 0 || !UserData || !UserData.address) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className={`order-page ${isModalOpen ? "blur-background" : ""}`}>
            <div className="order-summary">
                <h2>Order Details</h2>

                <div className="order-items">
                    <h3>Ordered Products</h3>
                    {items.map((product) => (
                        <div key={product._id} className="order-item">
                            <img
                                className="item-img"
                                src={product.productId.imageUrl || "default-image.jpg"}
                                alt={product.title || "Product Image"}
                            />
                            <div className="item-details">
                                <h4 className="item-title">{product.productId.title || "Untitled Product"}</h4>

                                <p className="item-info">
                                    <span>Type:</span> {product.productId.type || "No type"}
                                </p>
                                <p className="item-info">
                                    <span>Size:</span> {product.size || "No size"}
                                </p>
                                <p className="item-info">
                                    <span>Color:</span> {product.color || "No color"}
                                </p>
                                <p className="item-info">
                                    <span>Quantity:</span> {product.qty || 0}
                                </p>
                                <p className="item-info">
                                    <span>Price:</span> ₹{product.price || 0}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="order-footer">
                    <h3 className="total-amount">
                        <span>Total Amount:</span> ₹
                        {items.reduce((total, product) => total + product.price * product.qty, 0)}
                    </h3>
                    <div className="actions">
                        <button className="btn-primary" onClick={handleConfirmOrder}>
                            Confirm Order
                        </button>
                        <button className="btn-secondary" onClick={() => UserCancelOrder(OrderId)}>
                            Cancel Order
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="address-popup">
                    <div className="popup-content">
                        <button className="close-popup-btn" onClick={handleClosePopup}>
                            &#8592;
                        </button>
                        <h3>Shipping Address</h3>
                        {UserData.address.map((addr) => (
                            <div key={addr._id} className="address-details">
                                {isEditing && editedAddress && editedAddress._id === addr._id ? (
                                    <div className="edit-address">
                                        <input type="text" name="fullName" value={editedAddress.fullName} onChange={handleAddressChange} placeholder="Full Name" />
                                        <input type="text" name="street" value={editedAddress.street} onChange={handleAddressChange} placeholder="Street" />
                                        <input type="text" name="city" value={editedAddress.city} onChange={handleAddressChange} placeholder="City" />
                                        <input type="text" name="district" value={editedAddress.district} onChange={handleAddressChange} placeholder="District" />
                                        <input type="text" name="state" value={editedAddress.state} onChange={handleAddressChange} placeholder="State" />
                                        <input type="text" name="pincode" value={editedAddress.pincode} onChange={handleAddressChange} placeholder="Pincode" />
                                        <input type="text" name="landmark" value={editedAddress.landmark} onChange={handleAddressChange} placeholder="Landmark" />
                                        <input type="text" name="contact" value={editedAddress.contact} onChange={handleAddressChange} placeholder="Contact" />
                                        <button className="btn-primary" onClick={(e) => handleSaveAddress(e)}>Update</button>
                                        <button className="btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                                    </div>
                                ) : (
                                    <div>
                                        <p><strong>Full Name:</strong> {addr.fullName}</p>
                                        <p><strong>Street:</strong> {addr.street}</p>
                                        <p><strong>City:</strong> {addr.city}</p>
                                        <p><strong>District:</strong> {addr.district}</p>
                                        <p><strong>State:</strong> {addr.state}</p>
                                        <p><strong>Pincode:</strong> {addr.pincode}</p>
                                        <p><strong>Landmark:</strong> {addr.landmark}</p>
                                        <p><strong>Contact:</strong> {addr.contact}</p>
                                        <button className="btn-secondary" onClick={() => handleEditClick(addr)}>Edit</button>
                                        <button className="btn-secondary" onClick={() => handleOrdernow(addr)}>Order Now</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderPage;
