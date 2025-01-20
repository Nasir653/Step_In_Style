import React, { useContext, useState } from 'react';
import { context } from '../Context/Store';
import './ForgetPassword.scss';

const ForgetPassword = () => {
    const { ResetLink } = useContext(context);
    const [email, setemail] = useState("");

    return (
        <div className="forget-password-container">
            <div className="forget-password-content">
                <h1 className="forget-password-heading">Forgot Password?</h1>
                <p className="forget-password-description">Enter your email to receive a password reset link.</p>

                <form className="forget-password-form">
                    <input
                        className="forget-password-input"
                        type="email"
                        placeholder="Your Registered Email"
                        value={email}
                        onChange={(e) => { setemail(e.target.value) }}
                    />

                    <button
                        className="forget-password-button"
                        onClick={(e) => { ResetLink(e, email) }}
                    >
                        Reset Link
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;
