
import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom";
import './global.css';
import { ToastContainer } from "react-toastify";
import { context } from '../Context/Store';






const Login = () => {

  const { loginHandler } = useContext(context)


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
            <h1>Login</h1>

          </div>

          <p>Login With Your Details</p>

          <form>


            <input type="email" placeholder=' Email' value={email} onChange={(e) => { setemail(e.target.value) }} />
            <input type="password" placeholder=' Password' value={password} onChange={(e) => { setpassword(e.target.value) }} />
            <p>  <a href="/user/forgetpassword">Forget Password</a></p>

            <button onClick={(e) => { loginHandler(e, formData) }}>Login</button>



          </form>

          <p> New User?   <Link className="registerBtn" to="/user/register">Register </Link>   </p>



        </div>




      </div>

    </>
  )
}

export default Login