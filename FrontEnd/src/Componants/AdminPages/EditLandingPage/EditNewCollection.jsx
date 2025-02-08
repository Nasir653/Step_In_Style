import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditNewCollection.scss";
import { context } from "../../../Context/Store";
import { Link } from "react-router-dom";
import IsAuthorized from "../../../utils/IsAuthorized";

const EditNewCollection = () => {
    const { NewCollection, getNewCollection, EditNewCollection, deleteProducts } = useContext(context);
    const navigate = useNavigate();

    const [editingProductId, setEditingProductId] = useState(null);

    const [productData, setProductData] = useState({
        title: "",
        price: "",
    });

    const [image, setImage] = useState(null);


    IsAuthorized();

    useEffect(() => {
        getNewCollection("New Collection");
    }, []);

    const handleEdit = (product) => {
        setEditingProductId(product._id);
        setProductData({
            title: product.title,
            price: product.price,
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevInput) => ({ ...prevInput, [name]: value }));
    };

    const handleSubmit = (e, productId) => {
        e.preventDefault();
        setEditingProductId(null); // Close the form after submission
        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", productData.title);
        formData.append("price", productData.price);

        EditNewCollection(formData, productId);
        setImage(null); // Reset image state after submission
    };

    return (
        <div>
            <div className="New-collection">
                <h1>New Collections</h1>
                <div className="EditNew_Collections">
                    {NewCollection &&
                        NewCollection.map((product) => (
                            <div key={product._id} className="items">
                                {editingProductId === product._id ? (
                                    // Form for editing the specific product
                                    <form>
                                        <input
                                            type="file"
                                            onChange={(e) => setImage(e.target.files[0])}
                                        />
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="Enter Product Title"
                                            value={productData.title}
                                            onChange={handleChange}
                                        />
                                        <input
                                            type="text"
                                            name="price"
                                            placeholder="Enter Product Price"
                                            value={productData.price}
                                            onChange={handleChange}
                                        />
                                        <button
                                            onClick={(e) => handleSubmit(e, product._id)}
                                        >
                                            Submit
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setEditingProductId(null); // Cancel editing
                                                setImage(null); // Reset image field
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </form>
                                ) : (
                                    // Default product view
                                    <>
                                        <img
                                            src={product.imageUrl}
                                            alt={product.title}
                                            className="coll-img"
                                            onClick={() =>
                                                navigate(`/product/details/${product._id}`)
                                            }
                                        />
                                        <div className="info">
                                            <span>{product.title}</span>
                                            <span>INR: {product.price}</span>
                                            <button onClick={() => handleEdit(product)}>
                                                Edit
                                            </button>
                                            <button onClick={() => deleteProducts(product._id)}>Delete</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    <div className="addNew">
                        <Link to="/Create/mensProducts">Add New +</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditNewCollection;
