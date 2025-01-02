import React, { useContext, useEffect } from 'react'
import { context } from '../../Context/Store';
import { useNavigate } from 'react-router-dom';
import "./MensTShirt.scss";

const MensTshirts = () => {

    const navigate = useNavigate();
    const { allProducts, getMensProducts, addToCart } = useContext(context);

    useEffect(() => {

        getMensProducts("Mens", "T-Shirts");

    }, [])




    return (
        <>

            <div className='container-fluid'>

                <h2 className='tshirt-title'>T-Shirts</h2>

                <div className="tshirt-div">



                    {allProducts &&
                        allProducts.map((tshirt) => (
                            <div
                                className="items "

                            >

                                <div className="item-details" onClick={(e) => {
                                    navigate(`/product/details/${tshirt._id}`);

                                }}>
                                    <img
                                        src={tshirt.imageUrl}
                                        alt={tshirt.title}
                                        className="coll-img"
                                    />

                                    <span> {tshirt.title} </span>

                                    <span> INR : {tshirt.price} </span>
                                </div>
                                <button onClick={() => addToCart(tshirt._id)}>Add To Cart</button>
                                <button>Order Now </button>


                            </div>
                        ))}

                </div>
            </div>





        </>
    )
}

export default MensTshirts