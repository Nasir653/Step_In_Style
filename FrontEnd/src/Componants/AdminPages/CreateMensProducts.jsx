import React, { useContext, useState } from "react";
import { context } from "../../Context/Store";
import "./CreateMensProducts.scss";

const CreateMensProducts = () => {
    const { CreateProducts } = useContext(context);

    const [formData, setFormData] = useState({
        title: "",
        details: "",
        price: "",
        category: "",
        subCategory: "",
        type: "",
        sizes: "",
        colors: "",
        qty: ""
    });

    const [fileData, setFileData] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevInput) => ({ ...prevInput, [name]: value }));
    };

    const fileUpload = new FormData();

    fileUpload.append("image", fileData);
    fileUpload.append("title", formData.title);
    fileUpload.append("details", formData.details);
    fileUpload.append("price", formData.price);
    fileUpload.append("category", formData.category);
    fileUpload.append("subCategory", formData.subCategory);
    fileUpload.append("type", formData.type);
    fileUpload.append("sizes", formData.sizes);
    fileUpload.append("colors", formData.colors);
    fileUpload.append("qty", formData.qty);

    return (
        <div className="create-product-container container py-5">
            <h2 className="text-center mb-4">Create Men's Product</h2>
            <form
                encType="multipart/form-data"
                className="create-product-form"
                onSubmit={(e) => CreateProducts(e, fileUpload)}
            >
                {/* Title */}
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Enter product title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Details */}
                <div className="mb-3">
                    <label htmlFor="details" className="form-label">Details</label>
                    <textarea
                        className="form-control"
                        id="details"
                        placeholder="Enter product details"
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        rows="3"
                        required
                    ></textarea>
                </div>

                {/* Price */}
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        placeholder="Enter price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Category */}
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select
                        id="category"
                        className="form-select"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Choose Category</option>
                        <option value="Mens">Men's</option>
                        <option value="Womens">Women's</option>
                        <option value="Kids">Kid's</option>

                    </select>
                </div>


                <div className="mb-3">
                    <label htmlFor="Sub-category" className="form-label">Also Display On</label>
                    <select
                        id="Sub-category"
                        className="form-select"
                        name="subCategory"
                        value={formData.subCategory}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Set on</option>
                        <option value="New Collection">New Collection</option>
                        <option value="Trending">Trending</option>
                        <option value="None">None</option>


                    </select>
                </div>

                {/* Type */}
                <div className="mb-3">
                    <label htmlFor="type" className="form-label">Type</label>
                    <select
                        id="type"
                        className="form-select"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Choose Type</option>
                        <option value="Shirts">Shirts</option>
                        <option value="T-Shirts">T-Shirts</option>
                        <option value="Jeans">Jeans</option>
                        <option value="Shoes">Shoes</option>
                        <option value="Kurtas">Kurtas</option>
                    </select>
                </div>

                {/* Size */}
                <div className="mb-3">
                    <input type="text" placeholder="Sizes" name="sizes"
                        value={formData.sizes}
                        onChange={handleChange} />
                </div>

                {/* Color */}
                <div className="mb-3">
                    <input type="text" placeholder="colors" name="colors"
                        value={formData.colors}
                        onChange={handleChange} />

                </div>
                <div className="mb-3">
                    <input type="number" placeholder="Qty" name="qty"
                        value={formData.qty}
                        onChange={handleChange} />
                </div>

                {/* Image Upload */}
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Upload Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        onChange={(e) => setFileData(e.target.files[0])}
                        required
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-danger w-100">Create</button>
            </form>
        </div>
    );
};

export default CreateMensProducts;
