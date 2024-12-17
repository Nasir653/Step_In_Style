
import React, { useContext, useState } from 'react'
import { context } from '../Context/Store';

const ForgetPassword = () => {

    const {ResetLink} = useContext(context);
    const [email, setemail] = useState("");

    


    return (






        <div>


            <form>


                <input type="email" placeholder='Your Registered Email' value={email} onChange={(e) => { setemail(e.target.value) }} />

                <button onClick={ (e) => { ResetLink(e, email) } }>Reset Link</button>

            </form>



        </div>

    )
}

export default ForgetPassword