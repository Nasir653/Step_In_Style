import React, { useContext, useEffect } from 'react';
import { context } from '../Context/Store';
import { useParams } from 'react-router-dom';
import './OrderPage.scss';

const OrderPage = () => {
    const { fetchOrderBtyId, OrderById, cancelOrder } = useContext(context);
    const { OrderId } = useParams();

    useEffect(() => {
        fetchOrderBtyId(OrderId);
    }, [OrderId]);

    const handlePayment = () => {
        // Mock payment gateway
        alert('Redirecting to payment gateway...');
    };

    if (!OrderById || !OrderById.productId) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="order-page">
            <div className="order-summary">
                <h2>Order Details</h2>
                <div className="order-item">
                    <img
                        className="item-img"
                        src={OrderById.productId.imageUrl}
                        alt={OrderById.productId.title}
                    />
                    <div className="item-details">
                        <h4 className="item-title">{OrderById.productId.title}</h4>
                        <p className="item-info">
                            <span>Size:</span> {OrderById.size}
                        </p>
                        <p className="item-info">
                            <span>Color:</span> {OrderById.color}
                        </p>
                        <p className="item-info">
                            <span>Qty:</span> {OrderById.qty}
                        </p>
                        <p className="item-info">
                            <span>Order Cost:</span> ₹{OrderById.orderCost}
                        </p>
                    </div>
                </div>
                <div className="actions">
                    <button className="btn-primary" onClick={handlePayment}>
                        Proceed to Payment
                    </button>
                    <button className="btn-secondary" onClick={() => cancelOrder(OrderById._id)}>Cancel Order</button>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
