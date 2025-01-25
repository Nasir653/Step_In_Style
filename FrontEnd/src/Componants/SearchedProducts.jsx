import React, { useContext } from 'react';
import { context } from '../Context/Store';
import './SearchedProducts.scss';
import { useNavigate } from 'react-router-dom';


const SearchedProducts = () => {
    const { SearchedItems, ProductDetails } = useContext(context);
    const navigate = useNavigate();

    return (
        <div className="searched-products">
            {(!SearchedItems || SearchedItems.length === 0) ? (
                <div className="no-items-container">
                    <p className="no-items">No items found</p>
                </div>
            ) : (
                SearchedItems.map((ele) => (
                    <div className="searched-item" key={ele._id} onClick={() => {
                        navigate(`/product/details/${ele._id}`);
                    }}>
                        <img
                            src={ele.imageUrl}
                            alt={ele.title}
                            className="searched-item-img"
                        />
                        <div className="searched-item-details">
                            <h4 className="searched-item-title">{ele.title}</h4>
                            <h5 className="searched-item-description">{ele.details}</h5>
                            <h3 className="searched-item-price">INR {ele.price}</h3>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default SearchedProducts;
