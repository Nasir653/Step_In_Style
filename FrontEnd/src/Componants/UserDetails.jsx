import { useContext, useState } from "react";
import { context } from "../Context/Store";
import "./UserDetails.scss";

const UserDetails = () => {
    const { editAddress } = useContext(context);
    const [addressInput, setAddressInput] = useState({
        fullName: "",
        street: "",
        city: "",
        district: "",
        state: "",
        pincode: "",
        landmark: "",
        contact: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddressInput((prevInput) => ({ ...prevInput, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        editAddress(e, addressInput);


        setAddressInput({
            fullName: "",
            street: "",
            city: "",
            district: "",
            state: "",
            pincode: "",
            landmark: "",
            contact: "",
        });
    };

    return (
        <div className="addDetails-form">
            <h1>Add Details</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="fullName"
                    value={addressInput.fullName}
                    onChange={handleChange}
                    placeholder="Enter FullName"
                />
                <input
                    type="text"
                    name="street"
                    value={addressInput.street}
                    onChange={handleChange}
                    placeholder="Enter street"
                />
                <input
                    type="text"
                    name="city"
                    value={addressInput.city}
                    onChange={handleChange}
                    placeholder="Enter city"
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
                    value={addressInput.contact}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UserDetails;
