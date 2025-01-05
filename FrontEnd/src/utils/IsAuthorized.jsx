import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const IsAuthorized = () => {


    const navigate = useNavigate();

    const token = localStorage.getItem("Token");
    if (!token) {
        console.log("no token found");

    }


    const verifyUser = async () => {

        try {


            const url = `http://localhost:4000/user/verify/${token}`;


            const res = await axios.get(url);




            if (res.data.message === " User Verified") {
                navigate("/")
            }

        } catch (error) {

            console.log("server error");


        }

    }

    useEffect(() => {


        if (!token) {

            return navigate("/user/login")

        }

        else {
            verifyUser()
        }


    }, [token]);
};








export default IsAuthorized