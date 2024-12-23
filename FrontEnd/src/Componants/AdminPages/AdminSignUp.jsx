import React, { useContext, useState } from 'react';
import './Admin.scss';
import { Link } from 'react-router-dom';
import { context } from '../../Context/Store';






export const AdminSignUp = () => {

    const { adminSignUp } = useContext(context)




    const [username, setuserName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");


    const formData = {

        username, email, password

    }


    return (

        <div className='conatainer'>


            <div className="signup-div">

                <div className="heading col col-12">


                    <h1>Register YourSelf</h1>


                </div>

                <p>Let's Register YourSelf With Us ! </p>


                <form>


                    <input type="text" placeholder=' Username' value={username} onChange={(e) => { setuserName(e.target.value) }} />
                    <input type="email" placeholder=' Email' value={email} onChange={(e) => { setemail(e.target.value) }} />
                    <input type="password" placeholder=' Password' value={password} onChange={(e) => { setpassword(e.target.value) }} />

                    <button onClick={(e) => { adminSignUp(e, formData) }}>Register</button>



                </form>

                <p>Already an User ? <Link className='loginBtn' to="/user/login">Login</Link> </p>


            </div>




        </div>


    )
}

export default AdminSignUp