import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { context } from '../Context/Store';

const ProtectedPages = ({ children }) => {
    const { UserData } = useContext(context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!UserData?.IsAdmin) {
            navigate("/");
        }
    }, [UserData, navigate]);

    return UserData?.IsAdmin ? children : null; // Ensure it returns children if authorized
}

export default ProtectedPages