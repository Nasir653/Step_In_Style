import React, { useContext, useState, useEffect } from 'react';
import './NavBar.scss';
import { Link, useNavigate } from 'react-router-dom';
import { context } from '../Context/Store';
import { BiSolidCartAlt } from "react-icons/bi";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

function NavBar() {
    const { UserData, fetchCartItems, SearchInput, logout } = useContext(context);
    const [searchInput, setSearchInput] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.dropdown') && !e.target.closest('.menu-icon') && dropdownOpen) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [dropdownOpen]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            SearchInput(searchInput);
        }
    };

    const handleLogout = () => {
        logout();
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        if (menuOpen) {
            setDropdownOpen(false);
        }
    };

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="NavBar">
            <div className="header">
                <h4>Step In Style</h4>
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

                <button className="menu-icon" onClick={toggleMenu}>
                    {menuOpen ? <IoMdClose /> : <FiMenu />}
                </button>

                <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
                    <ul>
                        <li><Link className="link" to="/">Home</Link></li>
                        <li><Link className="link" to="/Category/mens">Men's</Link></li>
                        <li><Link className="link" to="/Category/womens">Women's</Link></li>
                        <li><Link className="link" to="/Category/kids">Kid's</Link></li>

                        <li onClick={fetchCartItems}>
                            <Link className="link fs-5 border" to="/user/cart">
                                <BiSolidCartAlt />
                            </Link>
                        </li>

                        <li>
                            {UserData.username ? (
                                <span>{UserData.username}</span>
                            ) : (
                                <Link className="link" to="/user/login">Login</Link>
                            )}
                        </li>

                        {/* Profile Dropdown */}
                        {UserData.username && (
                            <div className="dropdown">
                                <button
                                    className="btn btn-light dropdown-toggle"
                                    type="button"
                                    onClick={handleDropdownToggle}
                                >
                                    <RiAccountPinCircleFill />
                                </button>

                                {dropdownOpen && (
                                    <ul className="dropdown-menu show">
                                        <li><Link className="dropdown-item" to="/user/OrderStatus">Your Orders</Link></li>
                                        <li><Link className="dropdown-item" to="/user/profile">Profile</Link></li>
                                        <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
                                        <li onClick={handleLogout}><button className="dropdown-item">Logout</button></li>
                                        {UserData.IsAdmin && (
                                            <li><Link className="dropdown-item" to="/admin">Admin</Link></li>
                                        )}
                                    </ul>
                                )}
                            </div>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default NavBar;
