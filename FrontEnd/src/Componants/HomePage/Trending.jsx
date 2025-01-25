import React, { useContext, useEffect } from 'react';
import { context } from '../../Context/Store';

import './Trending.scss';

const Trending = () => {
    const { TrendingProducts, getTrendingProducts } = useContext(context);

    useEffect(() => {
        getTrendingProducts("Trending");
    }, []);

    return (
        <>
            <div className="trending-section">
                <h1 className="trending-title">Trending</h1>
                <div className="trending-products">
                    {TrendingProducts &&
                        TrendingProducts.map((product) => (
                            <div
                                key={product._id}
                                className="trending-item"
                                onClick={(e) => {
                                    // navigate(`/product/details/${product._id}`);
                                }}
                            >
                                <img
                                    src={product.imageUrl}
                                    alt={product.title}
                                    className="trending-image"
                                />
                                <span className="trending-product-title">
                                    {product.title}
                                </span>
                                <span className="trending-product-price">
                                    INR : {product.price}
                                </span>
                                <span className="trending-product-price">
                                    {product.sizes}
                                </span>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default Trending;
