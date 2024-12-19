import React, { useContext, useState } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { context } from '../Context/Store';
import { BiSolidCartAlt } from "react-icons/bi";
import { RiAccountPinCircleFill } from "react-icons/ri";


function NavBar() {
    const { UserData, fetchCartItems, SearchInput, logout } = useContext(context);
    const [searchInput, setSearchInput] = useState("");

    console.log(UserData);
    
    
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            SearchInput(searchInput); 
        }

        //setSearchInput("")
    };

    return (

        <>
        <div className="NavBar">
            <div className="header">
              
                <img className="logo" src="Screenshot (39).png" alt="Error"></img>

                
                <div className="search-div">
                    <input
                        type="search"
                        className="search-input"
                        placeholder="Search Your Item"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)} 
                        onKeyDown={handleKeyDown} 
                    />
                </div>

               
                <nav className="header-nav">
                    <li><Link className="link" to="/">Home</Link></li>
                    <li><Link className="link" to="/Category/mens">Men's</Link></li>
                        <li><Link className="link" to="/Category/womens">Women's</Link></li>
                    <li><Link className="link" to="/">Kid's</Link></li>


                    <li onClick={() => fetchCartItems()}>
                        <Link className="link fs-5 border" to="/user/cart" >  <BiSolidCartAlt/> </Link>
                    </li>


                    <li>
                        {UserData.username ? (
                            UserData.username
                        ) : (
                            <Link className="link" to="/user/login">Login</Link>
                        )}
                        </li>
                        

                        
                     
                               
                                <div class="dropdown">
                                    <button
                                        class="btn btn-light dropdown-toggle"
                                        type="button"
                                        id="accountDropdown"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                <RiAccountPinCircleFill />
                                    </button>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="accountDropdown">
                                <li>
                                    <Link className="dropdown-item" to="/profile">
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/settings">
                                        Settings
                                    </Link>
                                </li>
                                <li onClick={logout}>
                                    <Link className="dropdown-item" to="/logout">
                                        Logout
                                    </Link>
                                </li>
                                <li >
                                    <Link className="dropdown-item" to="/admin/portal">
                                        Admin
                                    </Link>
                                </li>
                            </ul>
                                </div>
                </nav>
            </div>
        </div>


        
        {/* // --------------------------------------  Footer ----------------------------------------------- */}
        
        
           
         
           



        </>    
        
        
    );
}

export default NavBar;
