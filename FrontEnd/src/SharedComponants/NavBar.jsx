import React, { useContext, useState } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { context } from '../Context/Store';

function NavBar() {
    const { UserData, fetchCartItems, SearchInput } = useContext(context);
    const [searchInput, setSearchInput] = useState("");

    console.log(UserData);
    
    
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            SearchInput(searchInput); 
        }

        //setSearchInput("")
    };

    return (
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
                    <li><Link className="link" to="/">Mens</Link></li>
                    <li><Link className="link" to="/">Womens</Link></li>
                    <li onClick={() => fetchCartItems()}>
                        <Link className="link" to="/user/cart">Cart</Link>
                    </li>
                    <li>
                        {UserData.username ? (
                            UserData.username
                        ) : (
                            <Link className="link" to="/user/login">Login</Link>
                        )}
                    </li>
                </nav>
            </div>
        </div>
    );
}

export default NavBar;
