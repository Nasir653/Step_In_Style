import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditNewCollection.scss";
import { context } from "../../../Context/Store";
import { Link } from 'react-router-dom';

const EditNewCollection = () => {
    const { allProducts, getNewCollection, } = useContext(context);
    const navigate = useNavigate();

    console.log(allProducts);

    useEffect(() => {
        getNewCollection("New Collection");
    }, []);

    return (
        <div>


            <div className="New-collection">
                <h1>New Collections</h1>
                <div className="EditNew_Collections">
                    {allProducts &&
                        allProducts.map((product) => (
                            <div
                                className="items"
                                
                            >
                                <img
                                    src={product.imageUrl}
                                    alt={product.title}
                                    className="coll-img"
                                    onClick={(e) => {
                                        navigate(`/product/details/${product._id}`);

                                    }}
                                />

                                <div className="info">
                                <span> {product.title} </span>
                                <span> INR : {product.price} </span>

                                <button>Edit</button>
                                    <button>Delete</button>
                                    
                                </div>
                            </div>
                        ))}
                    
                    <div className="addNew">
                        <Link to="/Create/mensProducts"  >  add New +</Link>
                    
                    </div>

                </div>


            </div>

            
            

        </div>
    );
};

export default EditNewCollection;
