
import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom";
import './Admin.scss';
import { ToastContainer } from "react-toastify";
import { context } from '../../Context/Store';






const AdminLogin = () => {

    const { adminLogin } = useContext(context)


    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");


    const formData = {
        email, password
    }









    return (

        <>

            <ToastContainer />


            <div className='conatainer'>




                <div className="signup-div">

                    <div className="heading  col col-12">
                        <h1>Admin Login</h1>

                    </div>

                    <p>Login With Your Details</p>

                    <form>


                        <input type="email" placeholder=' Email' value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <input type="password" placeholder=' Password' value={password} onChange={(e) => { setpassword(e.target.value) }} />
                        <p>  <a href="/user/forgetpassword">Forget Password</a></p>

                        <button onClick={(e) => { adminLogin(e, formData) }}>Login</button>



                    </form>

                   



                </div>




            </div>

        </>
    )
}

export default AdminLogin