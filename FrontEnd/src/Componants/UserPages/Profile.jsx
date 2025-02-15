import React, { useContext, useState, useEffect } from "react";
import { context } from "../../Context/Store";
import "./Profile.scss";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineHeart, AiOutlineEdit } from "react-icons/ai";
import { MdLocationOn, MdLocalOffer, MdContactSupport } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Address from "./Address";

const Profile = () => {

    const navigate = useNavigate();

    const { UserData, ProfiePic, EditUser } = useContext(context);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [ShowProfile, setShowProfile] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        gender: "",
        dob: ""
    });


    useEffect(() => {
        if (UserData) {
            setFormData({
                username: UserData.username || "",
                email: UserData.email || "",
                phone: UserData.phone || "",
                gender: UserData.gender || "",
                dob: UserData.dob || ""
            });
        }
    }, [UserData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevInput) => ({ ...prevInput, [name]: value }));
    };

    const form = new FormData();
    form.append("image", selectedImage);
    form.append("username", formData.username);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("gender", formData.gender);
    form.append("dob", formData.dob);

    const handleUpload = () => {
        if (selectedImage) {
            ProfiePic(form);
            console.log(form);
        }
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveChanges = () => {
        EditUser(form);
        setIsEditing(false);
    };

    const handleAddress = () => {
        setShowProfile(false);


    }

    return (
        <div className="profile-container">
            <div className="sidebar">
                <div className="profile-pic">
                    <img src={selectedImage || UserData.profilePic} alt={UserData.username} />
                    <label htmlFor="image-upload" className="upload-label">
                        <AiOutlineEdit /> Select Image
                    </label>
                    <input
                        type="file"
                        id="image-upload"
                        name="image"
                        accept="image/*"
                        className="img-input"
                        onChange={(e) => setSelectedImage(e.target.files[0])}
                    />
                    {selectedImage && <button onClick={handleUpload}>Upload</button>}
                </div>
                <h3>{UserData.username}</h3>
                <p> {UserData.IsAdmin && "Admin"} </p>
                <p>{UserData.email}</p>


                <ul className="menu">
                    <li onClick={() => navigate("/user/OrderStatus")}><FaShoppingCart /> My Orders</li>
                    <li onClick={handleAddress}><MdLocationOn /> My Address</li>
                    <li><AiOutlineHeart /> Wishlist</li>
                    <li><MdLocalOffer /> Coupons</li>
                    <li><MdContactSupport /> Contact Us</li>
                </ul>
            </div>



            <div className="profile-details">
                {ShowProfile ? (
                    <>
                        <div className="edit-header">
                            <h2>My Profile</h2>
                            <AiOutlineEdit onClick={handleEditClick} className="edit-icon" />
                        </div>

                        <form>
                            <label>Full Name *</label>
                            <input
                                type="text"
                                value={formData.username}
                                disabled={!isEditing}
                                onChange={handleChange}
                                name="username"
                            />

                            <label>Email ID *</label>
                            <input
                                type="email"
                                value={formData.email}
                                disabled={!isEditing}
                                onChange={handleChange}
                                name="email"
                            />

                            <label>Mobile *</label>
                            <div className="mobile-input">
                                <span>+91</span>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                />
                            </div>

                            <label>Gender *</label>
                            <div className="gender-options">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={formData.gender === "Male"}
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                /> Male
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={formData.gender === "Female"}
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                /> Female
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Other"
                                    checked={formData.gender === "Other"}
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                /> Other
                            </div>

                            <label>Date of Birth *</label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                disabled={!isEditing}
                                onChange={handleChange}
                            />

                            {isEditing && (
                                <button type="button" onClick={handleSaveChanges}>
                                    Save Changes
                                </button>
                            )}
                        </form> </>)
                    : <Address />}
            </div>

        </div>


    );
};

export default Profile;
