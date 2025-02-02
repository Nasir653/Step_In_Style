import React, { useContext, useEffect, useState, useRef } from 'react';
import { context } from '../../Context/Store';
import './Customers.scss';

const Customers = () => {
    const { fetchAllUsers, AllUsers } = useContext(context);
    const [selectedUserOrders, setSelectedUserOrders] = useState(null);
    const [selectedUserCart, setSelectedUserCart] = useState(null);
    const modalRef = useRef(null);

    useEffect(() => {
        fetchAllUsers();
    }, []);

    // Function to close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setSelectedUserOrders(null);
                setSelectedUserCart(null);
            }
        };

        if (selectedUserOrders || selectedUserCart) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectedUserOrders, selectedUserCart]);

    return (
        <div className="customers-container">
            <h2>Customers</h2>
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Orders</th>
                            <th>Cart</th>
                            <th>Is Admin</th>
                            <th>Profile Pic</th>
                        </tr>
                    </thead>
                    <tbody>
                        {AllUsers && AllUsers.length > 0 ? (
                            AllUsers.map((user, index) => (
                                <tr key={index}>
                                    <td>{user._id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                        <button
                                            className="order-btn"
                                            onClick={() => setSelectedUserOrders(user.orders)}
                                        >
                                            {user.orders.length} Orders
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="cart-btn"
                                            onClick={() => setSelectedUserCart(user.cart)}
                                        >
                                            {user.cart.length} Items
                                        </button>
                                    </td>
                                    <td>{user.IsAdmin ? "Yes" : "No"}</td>
                                    <td>
                                        <img src={user.profilePic} alt="Profile" />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Orders Modal */}
            {selectedUserOrders && (
                <div className="orders-modal-overlay">
                    <div className="orders-modal" ref={modalRef}>
                        <h3>User Orders</h3>
                        <button className="close-btn" onClick={() => setSelectedUserOrders(null)}>X</button>
                        <div className="orders-list">
                            {selectedUserOrders.map((order, index) => (
                                <div key={index} className="order-card">
                                    <p><strong>Order Id:</strong> {order._id}</p>
                                    <p><strong>Order Status:</strong> {order.orderStatus}</p>
                                    <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
                                    <div className="products">
                                        {order.products.map((product, i) => (
                                            <div key={i} className="product">
                                                <img src={product.productId.imageUrl} alt={product.productId.title} className="product-img" />
                                                <p><strong>{product.productId.title}</strong></p>
                                                <p>Size: {product.size}</p>
                                                <p>Color: {product.color}</p>
                                                <p>Price: ${product.price}</p>
                                                <p>Quantity: {product.qty}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Cart Modal */}
            {selectedUserCart && (
                <div className="cart-modal-overlay">
                    <div className="cart-modal" ref={modalRef}>
                        <h3>User Cart</h3>
                        <button className="close-btn" onClick={() => setSelectedUserCart(null)}>X</button>
                        <div className="cart-list">
                            {selectedUserCart.map((item, index) => (
                                <div key={index} className="cart-item-card">
                                    <div className="cart-item-details">
                                        <img src={item.productId.imageUrl} alt={item.productId.title} className="cart-item-img" />
                                        <p><strong>{item.productId.title}</strong></p>
                                        <p>Price: ${item.price}</p>
                                        <p>Size: {item.size}</p>
                                        <p>Color: {item.color}</p>
                                        <p>Quantity: {item.qty}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Customers;
