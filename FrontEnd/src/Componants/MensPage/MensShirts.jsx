import React, { useContext, useEffect } from 'react'
import { context } from '../../Context/Store';
import { useNavigate } from 'react-router-dom';
import "./MensShirt.scss";

const MensShirts = () => {

    const navigate = useNavigate();
    const { allProducts, getMensProducts, addToCart } = useContext(context);

    useEffect(() => {

        getMensProducts("Mens", "Shirts");

    }, [])




    return (
        <>

            <div className='container-fluid'>

                <h2 className='Shirts-title'>Shirts</h2>

                <div className="shirts-div">



                    {allProducts &&
                        allProducts.map((shirt) => (
                            <div
                                className="items "

                            >

                                <div className="item-details" onClick={(e) => {
                                    navigate(`/product/details/${shirt._id}`);

                                }}>
                                    <img
                                        src={shirt.imageUrl}
                                        alt={shirt.title}
                                        className="coll-img"
                                    />

                                    <span> {shirt.title} </span>

                                    <span> INR : {shirt.price} </span>
                                </div>
                                <button onClick={() => addToCart(shirt._id)}>Add To Cart</button>
                                <button>Order Now </button>


                            </div>
                        ))}

                </div>
            </div>





        </>
    )
}

export default MensShirts