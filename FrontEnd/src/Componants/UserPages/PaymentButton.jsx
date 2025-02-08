import React from 'react';

const PaymentButton = ({ amount, userData, onSuccess, onFailure, editedAddress }) => {

    const handlePayment = () => {

        const options = {
            key: "rzp_test_Z36WCdNzfS0d1c", // Replace with your Razorpay key
            amount: amount * 100, // Amount in paise
            currency: "INR",
            name: "Your Company Name",
            description: "Product Description",
            handler: function (response) {
                // Ensure editedAddress is valid before calling onSuccess
                if (editedAddress && editedAddress._id) {
                    onSuccess(response, editedAddress);
                } else {
                    console.error("Address not available or invalid.");
                }
            },
            prefill: {
                name: userData?.name,
                email: userData?.email,
                contact: userData?.contact,
            },
            theme: {
                color: "#F37254",
            },
        };

        // Directly access Razorpay from window (no need to use 'new')
        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
    };

    return (
        <button className="btn-primary" onClick={handlePayment}>
            Confirm Order
        </button>
    );
};

export default PaymentButton;
