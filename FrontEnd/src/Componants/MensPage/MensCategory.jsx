import React, { useContext, useEffect } from 'react';
import { context } from '../../Context/Store';
import { useNavigate, useParams } from 'react-router-dom';
import "./MensCategory.scss";

const MensCategory = () => {

    const { allProducts, getMensProducts } = useContext(context);
    const { category } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getMensProducts("Mens", category);
    }, [category, getMensProducts]);

    console.log(allProducts);

    return (
        <div className='container-fluid'>

            <h2 className='category-title'>{category}</h2>

            <div className="mens-product-list">

                {allProducts &&
                    allProducts.map((product) => (
                        <div className="row mens-product-item " key={product._id} >

                            <div className="col mens-product-details" onClick={() => navigate(`/product/details/${product._id}`)}>
                                <img
                                    src={product.imageUrl}
                                    alt={product.title}
                                    className="product-image"
                                />
                                <span className="product-name"> {product.title} </span>
                                <span className="product-price"> INR : {product.price} </span>
                            </div>

                        </div>
                    ))}

            </div>
        </div>
    );
}

export default MensCategory;
