import React, { useContext } from 'react'
import { context } from '../../Context/Store';
import { useNavigate } from 'react-router-dom';
import "./MensShirt.scss";

const MensShirts = () => {

    const navigate = useNavigate();
    const { allProducts } = useContext(context);

    const Allshirts = allProducts.filter((ele) => ele.type === "Shirts");

    return (
        <>

            <div className='container-fluid'>
  
                
                <div className="shirts-div">
                
                {Allshirts &&
                    Allshirts.map((shirt) => (
                        <div
                            className="items "
                        onClick={(e) => {
                            navigate(`/product/details/${shirt._id}`);

                        }}
                        >
                            <img
                                src={shirt.imageUrl}
                                alt={shirt.title}
                                className="coll-img"
                            />

                            <span> {shirt.title} </span>

                            <span> INR : {shirt.price} </span>
                        </div>
                    ))}

                </div>
            </div>





        </>
    )
}

export default MensShirts