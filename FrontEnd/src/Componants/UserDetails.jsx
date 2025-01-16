import { useContext, useState } from "react";
import { context } from "../Context/Store";
import "./UserDetails.scss";

const UserDetails = () => {
    const { editUser } = useContext(context);
    const [addressInput, setAddressInput] = useState({
        street: "",
        district: "",
        state: "",
        pincode: "",
        landmark: "",
        phone: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddressInput((prevInput) => ({ ...prevInput, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit the address data directly without displaying it
        editUser(e, { addresses: [addressInput] });

        // Reset the form input after submission
        setAddressInput({
            street: "",
            district: "",
            state: "",
            pincode: "",
            landmark: "",
            phone: "",
        });
    };

    return (
        <div className="addDetails-form">
            <h1>Add Details</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="street"
                    value={addressInput.street}
                    onChange={handleChange}
                    placeholder="Enter street"
                />
                <input
                    type="text"
                    name="district"
                    value={addressInput.district}
                    onChange={handleChange}
                    placeholder="Enter district"
                />
                <input
                    type="text"
                    name="state"
                    value={addressInput.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                />
                <input
                    type="text"
                    name="pincode"
                    value={addressInput.pincode}
                    onChange={handleChange}
                    placeholder="Enter pincode"
                />
                <input
                    type="text"
                    name="landmark"
                    value={addressInput.landmark}
                    onChange={handleChange}
                    placeholder="Enter landmark"
                />
                <input
                    type="text"
                    name="phone"
                    value={addressInput.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UserDetails;
