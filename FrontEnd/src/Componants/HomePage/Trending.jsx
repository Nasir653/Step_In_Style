import React, { useContext, useEffect } from 'react'
import { context } from '../../Context/Store';

import "./Trending.scss"

const Trending = () => {


    const { TrendingProducts, getTrendingProducts } = useContext(context);


    useEffect(() => {
        getTrendingProducts("Trending");
    }, [])



    return (

        <>
            <div className="Trending" >

                <h1>Trending</h1>

                <div className="products">

                    {TrendingProducts &&
                        TrendingProducts.map((product) => (
                            <div key={product._id}
                                className="item"
                                onClick={(e) => {
                                    //navigate(`/product/details/${product._id}`);
                                }}
                            >
                                <img
                                    src={product.imageUrl}
                                    alt={product.title}
                                    className="image"
                                />

                                <span> {product.title} </span>

                                <span> INR : {product.price} </span>
                            </div>
                        ))}

                </div>


            </div>



        </>



    )
}

export default Trending