import React, { useContext, useState } from "react";
import "./SuggestedProducts.scss";
import { context } from "../../Context/Store";
import { useNavigate } from "react-router-dom";

const SuggestedPro = () => {
    const { SuggestedItems } = useContext(context);

    const navigate = useNavigate();

    return (
        <div className="suggested-items-container">
            <h2>You MAY ALSO LIKE</h2>
            <div className="suggested-items-grid" >
                {SuggestedItems && SuggestedItems.length > 0 ? (
                    SuggestedItems.map((item) => {


                        return (
                            <div key={item._id} className="suggested-item-card" onClick={(e) => { navigate(`/product/details/${item._id}`) }}>
                                <img src={item.imageUrl} alt={item.title} className="suggested-item-img" />
                                <h3 className="suggested-item-title">{item.title}</h3>
                                <p className="suggested-item-sizes">Sizes: {item.sizes}</p>
                                <p className="suggested-item-sizes">INR {item.price}</p>

                            </div>
                        );
                    })
                ) : (
                    <p>No suggested items available.</p>
                )}
            </div>
        </div>
    );
};

export default SuggestedPro;
