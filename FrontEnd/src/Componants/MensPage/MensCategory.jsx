import React, { useContext, useEffect } from 'react'
import { context } from '../../Context/Store';
import { useNavigate, useParams } from 'react-router-dom';
import "./MensCategory.scss";

const MensCategory = () => {

    const { allProducts, getMensProducts } = useContext(context);

    const { category } = useParams();

    const navigate = useNavigate();


    useEffect(() => {

        getMensProducts("Mens", category);

    }, [])



    return (
        <>

            <div className='container-fluid'>

                <h2 className='Shirts-title'>{category}</h2>

                <div className="shirts-div">



                    {allProducts &&
                        allProducts.map((shirt) => (
                            <div className="items" key={shirt._id} >

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
                                {/* <button onClick={() => addToCart(shirt._id)}>Add To Cart</button> */}
                                {/* <button onClick={() => Order(shirt._id)}>Order Now </button> */}


                            </div>






                        ))}

                </div>
            </div>
        </>
    )
}

export default MensCategory