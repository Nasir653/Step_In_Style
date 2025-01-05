import React, { useContext, useEffect } from 'react'
import { context } from '../../Context/Store';
import { useNavigate, useParams } from 'react-router-dom';
import "./WomensCategory.scss";
import { Category } from '../HomePage/Category';

const WomensCategory = () => {

    const { category } = useParams()
    const navigate = useNavigate();


    const { getWomensProducts, allProducts, addToCart } = useContext(context);


    useEffect(() => {
        getWomensProducts("womens", category);
    }, [])



    return (
        <>

            <div className='container-fluid'>

                <h2 className='WomensCategory-title'>{category}</h2>

                <div className="wowmens-div">



                    {allProducts &&
                        allProducts.map((product) => (
                            <div
                                className="items "
                                key={product._id}

                            >

                                <div className="item-details" onClick={(e) => {
                                    navigate(`/product/details/${product._id}`);

                                }}>
                                    <img
                                        src={product.imageUrl}
                                        alt={product.title}
                                        className="coll-img"
                                    />

                                    <span> {product.title} </span>

                                    <span> INR : {product.price} </span>
                                </div>
                                <button onClick={() => addToCart(product._id)}>Add To Cart</button>
                                <button>Order Now </button>


                            </div>
                        ))}

                </div>
            </div>




        </>
    )
}

export default WomensCategory