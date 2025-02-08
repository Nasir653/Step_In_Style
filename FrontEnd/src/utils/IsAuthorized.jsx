import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { context } from "../Context/Store";

const IsAuthorized = () => {
    const { UserData } = useContext(context);
    const navigate = useNavigate();


    useEffect(() => {

        if (UserData === undefined) return;

        if (!UserData?.IsAdmin) {
            navigate("/");
        }
    }, [UserData, navigate]);


};

export default IsAuthorized;
