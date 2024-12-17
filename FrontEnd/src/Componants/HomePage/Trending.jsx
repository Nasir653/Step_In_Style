import React, { useContext } from 'react'
import { context } from '../../Context/Store';

import "./Trending.scss"

const Trending = () => {


    const { productData } = useContext(context);


    const data = productData.filter((ele) => ele.category === "Trending");

    return (

        <>
            <div className="Trending" >

                <h1>Trending</h1>

                <div className="products">

                    {data &&
                        data.map((product) => (
                            <div
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