import React, { useContext, useEffect, useState } from "react";
import "./Address.scss";
import { context } from "../../Context/Store";

const Address = () => {
    const { UserData, editAddress } = useContext(context);
    const [showForm, setShowForm] = useState(false); // Toggle form visibility
    const [formData, setFormData] = useState({
        fullName: "",
        street: "",
        city: "",
        district: "",
        state: "",
        pincode: "",
        landmark: "",
        contact: "",
    });

    // Load address when UserData.address is available
    useEffect(() => {
        if (UserData?.address?.length > 0) {
            setFormData({ ...UserData.address[0] }); // Access first address in array
        }
    }, [UserData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editAddress(e, formData);
        setShowForm(false); // Hide form after submitting
    };

    return (
        <div className="address-container">
            <h2>My Address</h2>

            {/* Address Display */}
            {!showForm && (
                <div className="address-card">
                    <p><strong>Full Name:</strong> {formData.fullName}</p>
                    <p><strong>Street:</strong> {formData.street}</p>
                    <p><strong>City:</strong> {formData.city}, {formData.district}</p>
                    <p><strong>State:</strong> {formData.state}</p>
                    <p><strong>Pincode:</strong> {formData.pincode}</p>
                    <p><strong>Landmark:</strong> {formData.landmark}</p>
                    <p><strong>Contact:</strong> {formData.contact}</p>
                    <button className="btn-primary" onClick={() => setShowForm(true)}>Edit Address</button>
                </div>
            )}


            {/* Address Form (Visible when showForm is true) */}
            {showForm && (
                <form onSubmit={handleSubmit} className="address-form">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Street</label>
                        <input type="text" name="street" value={formData.street} onChange={handleChange} required />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>City</label>
                            <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>District</label>
                            <input type="text" name="district" value={formData.district} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>State</label>
                            <input type="text" name="state" value={formData.state} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Pincode</label>
                            <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Landmark</label>
                        <input type="text" name="landmark" value={formData.landmark} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Contact</label>
                        <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn-primary">Save Address</button>
                    <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default Address;
