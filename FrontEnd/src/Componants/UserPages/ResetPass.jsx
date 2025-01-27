import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';



const ResetPass = () => {



    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");


    const formData = {
        newPass, confirmPass
    }

    const { userId } = useParams();

    const chnageHandler = async (e) => {

        e.preventDefault();

        const url = `http://localhost:4000/user/resetpassword/${userId}`;
        const res = await axios.put(url, formData)

        console.log(res);

        // if (res.status === 200) {
        //   navigate("/")

        // }
        toast.success(res.data)

    }


    return (

        <>

            <ToastContainer />


            <div className='conatainer'>




                <div className="signup-div">


                    <div className="heading col col-12">

                        <h1>Reset Your Password</h1>

                    </div>

                    <form>


                        <input type="password" placeholder="New Password" value={newPass} onChange={(e) => { setNewPass(e.target.value) }} />
                        <input type="password" placeholder='Confirm Password' value={confirmPass} onChange={(e) => { setConfirmPass(e.target.value) }} />


                        <button onClick={chnageHandler}>Change</button>



                    </form>

                    <Link className='loginBtn' to="/user/login">Now Login</Link>


                </div>




            </div>

        </>

    )
}

export default ResetPass;
