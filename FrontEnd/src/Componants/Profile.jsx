import React, { useContext, useState } from 'react'
import { context } from '../Context/Store';
import "./Profile.scss";

const Profile = () => {

    const { UserData, ProfiePic, cart } = useContext(context);


    const [formData, setFormData] = useState(null)

    const form = new FormData();

    form.append("image", formData);


    return (

        <>
            <div className="card">

                <div className="imgDiv">
                    <img src={UserData.profilePic} alt="{UserData.username}" />
                    <label htmlFor="image">Select Profile Pic</label>
                    <input
                        className="img-input"
                        type="file"
                        id="image"
                        name="image"
                        onChange={(e) => setFormData(e.target.files[0])}
                    />

                    <button onClick={() => ProfiePic(form)}>Upload</button>

                </div>

                <div className="user-details">


                    <h5>Username : <span>{UserData.username}</span></h5>
                    <h5>Email : <span>{UserData.email}</span></h5>
                    <h5>Cart : <span>{cart.length}</span></h5>




                </div>



            </div>


        </>
    )
}

export default Profile