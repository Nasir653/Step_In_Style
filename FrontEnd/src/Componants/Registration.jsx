import React, { useContext, useState } from 'react';
import './Registration.scss';
import { Link } from 'react-router-dom';
import { context } from '../Context/Store';

export const Registration = () => {

  const { registerHandler } = useContext(context);

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const formData = {
    username, email, password
  };

  return (
    <div className='registration-container'>

      <div className="signup-form">

        <div className="form-heading">

          <h1>Register YourSelf</h1>

        </div>

        <p className="form-description">Let's Register YourSelf With Us !</p>

        <form className="registration-form">

          <input
            className="input-username"
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => { setusername(e.target.value) }}
          />
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

          <button
            className="register-button"
            onClick={(e) => { registerHandler(e, formData) }}>
            Register
          </button>

        </form>

        <p className="login-link">
          Already a User? <Link className='login-btn' to="/user/login">Login</Link>
        </p>

      </div>

    </div>
  );
}

export default Registration;
