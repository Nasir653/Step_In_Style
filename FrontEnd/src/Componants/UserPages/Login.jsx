import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import './Login.scss';
import { ToastContainer } from "react-toastify";
import { context } from '../../Context/Store';

const Login = () => {
  const { loginHandler } = useContext(context);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const formData = {
    email, password
  }

  return (
    <>
      <ToastContainer />
      <div className='login-container'>
        <div className="login-form">

          <div className="login-heading">
            <h1 className="login-title">Login</h1>
          </div>

          <p className="login-description">Login With Your Details</p>

          <form className="login-form-inputs">
            <input
              className="input-email"
              type="email"
              placeholder='Email'
              value={email}
              onChange={(e) => { setemail(e.target.value) }}
            />
            <input
              className="input-password"
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => { setpassword(e.target.value) }}
            />
            <p className="forgot-password">
              <a className="forgot-password-link" href="/user/forgetpassword">Forget Password?</a>
            </p>

            <button className="login-button" onClick={(e) => { loginHandler(e, formData) }}>
              Login
            </button>
          </form>

          <p className="new-user">
            New User? <Link className="register-link" to="/user/register">Register</Link>
          </p>

        </div>
      </div>
    </>
  );
}

export default Login;
