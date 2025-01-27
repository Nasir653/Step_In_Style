import React, { useContext, useState } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { context } from '../Context/Store';
import { BiSolidCartAlt } from "react-icons/bi";
import { RiAccountPinCircleFill } from "react-icons/ri";

function NavBar() {
    const { UserData, fetchCartItems, SearchInput, logout } = useContext(context);
    const [searchInput, setSearchInput] = useState("");



    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            SearchInput(searchInput);
        }
    };

    return (
        <>
            <div className="NavBar">
                <div className="header">

                    <img className="logo" src="step-in-style-logo.png" alt="Step in Style Logo" />

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
                            <Link className="link fs-5 border" to="/user/cart">  <BiSolidCartAlt /> </Link>
                        </li>

                        <li>
                            {UserData.username ? (
                                UserData.username
                            ) : (
                                <Link className="link" to="/user/login">Login</Link>
                            )}
                        </li>

                        <div className="dropdown">
                            <button
                                className="btn btn-light dropdown-toggle"
                                type="button"
                                id="accountDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <RiAccountPinCircleFill />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="accountDropdown">
                                <li>
                                    <Link className="dropdown-item" to="/user/OrderStatus">
                                        Your Orders
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/user/profile">
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
                                    <Link className="dropdown-item" to="/admin">
                                        Admin
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default NavBar;
