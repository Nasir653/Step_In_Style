import React, { useContext, useState, useEffect } from 'react';
import { context } from '../../Context/Store';
import './AllOrdersPage.scss';

const AllOrdersPage = () => {
    const { AllOrders } = useContext(context);

    // Set today's date as the default for start and end date
    const today = new Date().toISOString().split('T')[0];
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        // Normalize start and end dates to include the full day range
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0); // Set start date to midnight

        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // Set end date to the end of the day

        // Filter orders based on the normalized start and end dates
        const filtered = AllOrders.filter(order => {
            const createdOnDate = new Date(order.createdOn); // Parse the createdOn date
            return createdOnDate >= start && createdOnDate <= end; // Compare dates
        });

        console.log('Start Date:', start);
        console.log('End Date:', end);
        console.log('Filtered Orders:', filtered);

        setFilteredOrders(filtered); // Update filtered orders
    }, [startDate, endDate, AllOrders]);

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
                            <th>Created On</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => (
                            <tr key={order._id}>
                                <td>
                                    <img
                                        src={order.productId.imageUrl}
                                        alt="Product"
                                        className="product-image"
                                    />
                                </td>
                                <td>{order.productId.title}</td>
                                <td>{order.orderStatus}</td>
                                <td>{order.qty}</td>
                                <td>{order.size}</td>
                                <td>{order.color}</td>
                                <td>{new Date(order.createdOn).toLocaleString()}</td>
                                <td>
                                    <button className="details-button">Details</button>
                                    <button className="dispatch-button">Dispatch Order</button>
                                    <button className="cancel-button">Cancel Order</button>
                                </td>
                            </tr>
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
