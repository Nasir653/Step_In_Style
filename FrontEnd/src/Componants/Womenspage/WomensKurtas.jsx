import React, { useContext } from 'react'
import { context } from '../../Context/Store';
import { useNavigate } from 'react-router-dom';
import "./WomensKurtas.scss";

const WomensKurtas = () => {

    const navigate = useNavigate();
    const { Womensproducts } = useContext(context);
    console.log(Womensproducts);


    const AllKurtas = Womensproducts.filter((ele) => ele.type === "Kurtas");


    return (
        <>

            <div className='container-fluid'>

                <h2 className='Kurtas-title'>Kurti's</h2>

                <div className="kurtas-div">



                    {AllKurtas ?
                        AllKurtas.map((kurta) => (
                            <div
                                className="items "
                                onClick={(e) => {
                                    navigate(`/product/details/${kurta._id}`);

                                }}
                            >
                                <img
                                    src={kurta.imageUrl}
                                    alt={kurta.title}
                                    className="coll-img"
                                />

                                <span> {kurta.title} </span>

                                <span> INR : {kurta.price} </span>
                            </div>
                        )) : "No Data Found"}

                </div>
            </div>





        </>
    )
}

export default WomensKurtas