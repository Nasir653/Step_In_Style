import React, { useContext, useState } from 'react';
import './global.css';
import { Link } from 'react-router-dom';
import { context } from '../Context/Store';





export const Registration = () => {

  const { registerHandler } = useContext(context)




  const [username, setusername] = useState("");
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


          <input type="text" placeholder=' Username' value={username} onChange={(e) => { setusername(e.target.value) }} />
          <input type="email" placeholder=' Email' value={email} onChange={(e) => { setemail(e.target.value) }} />
          <input type="password" placeholder=' Password' value={password} onChange={(e) => { setpassword(e.target.value) }} />

          <button onClick={(e) => { registerHandler(e, formData) }}>Register</button>



        </form>

        <p>Already an User ? <Link className='loginBtn' to="/user/login">Login</Link> </p>


      </div>


    </div>


  )
}

export default Registration