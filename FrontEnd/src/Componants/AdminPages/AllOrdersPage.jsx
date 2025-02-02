import React, { useContext, useState, useEffect } from 'react';
import { context } from '../../Context/Store';
import './AllOrdersPage.scss';
import { useNavigate } from 'react-router-dom';

const AllOrdersPage = () => {
    const { fetchAllOrders, AllOrders, AdminCancelOrder, DispatchOrder } = useContext(context);
    const navigate = useNavigate();

    const today = new Date().toISOString().split('T')[0];
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [filteredOrders, setFilteredOrders] = useState([]);


    useEffect(() => {
        fetchAllOrders();
    }, [])


    useEffect(() => {


        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        const filtered = AllOrders.filter(order => {
            const createdOnDate = new Date(order.OrderDate);
            return createdOnDate >= start && createdOnDate <= end;
        });

        setFilteredOrders(filtered);
    }, [startDate, endDate, AllOrders]);

    const handleViewDetails = (orderId) => {
        navigate(`/Order/OrderDetails/${orderId}`);
    };

    const handleCancelOrder = async (orderId) => {
        try {
            await AdminCancelOrder(orderId);


            setFilteredOrders((prevOrders) =>
                prevOrders.map(order =>
                    order._id === orderId ? { ...order, orderStatus: "Cancelled" } : order
                )
            );
        } catch (error) {
            console.error("Failed to cancel order:", error);
        }
    };

    const handleDispatch = async (orderId) => {
        try {
            await DispatchOrder(orderId);


            setFilteredOrders((prevOrders) =>
                prevOrders.map(order =>
                    order._id === orderId ? { ...order, orderStatus: "Confirmed" } : order
                )
            );
        } catch (error) {
            console.error("Failed to dispatch order:", error);
        }
    };

    return (
        <div className="orders-container">
            <h1 className="orders-title">Recent Orders</h1>

            <div className="date-range-selector">
                <div>
                    <label htmlFor="startDate">Start Date: </label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="endDate">End Date: </label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>

            <div className="orders-summary">
                <p>Total Orders: <strong>{filteredOrders.length}</strong></p>
            </div>

            {filteredOrders.length > 0 ? (
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Order Status</th>
                            <th>Quantity</th>
                            <th>Size</th>
                            <th>Color</th>
                            <th>Ordered On</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => (
                            <React.Fragment key={order._id}>
                                {order.products.map((product, index) => (
                                    <tr key={`${order._id}-${index}`}>
                                        <td>
                                            <img
                                                src={product.productId.imageUrl}
                                                alt="Product"
                                                className="product-image"
                                            />
                                        </td>
                                        <td>{product.productId.title}</td>
                                        <td>{order.orderStatus || "Pending"}</td>
                                        <td>{product.qty}</td>
                                        <td>{product.size}</td>
                                        <td>{product.color}</td>
                                        <td>{new Date(order.OrderDate).toLocaleString()}</td>
                                        <td>
                                            <button
                                                className="details-button"
                                                onClick={() => handleViewDetails(order._id)}
                                            >
                                                Details
                                            </button>

                                            {order.orderStatus === "Confirmed" ? (
                                                <button className="dispatch-button" disabled>
                                                    Confirmed
                                                </button>
                                            ) : (
                                                <button
                                                    className="dispatch-button"
                                                    onClick={() => handleDispatch(order._id)}
                                                >
                                                    Dispatch Order
                                                </button>
                                            )}

                                            <button
                                                className="cancel-button"
                                                onClick={() => handleCancelOrder(order._id)}
                                            >
                                                Cancel Order
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-orders">No orders found for the selected date range.</p>
            )}
        </div>
    );
};

export default AllOrdersPage;
