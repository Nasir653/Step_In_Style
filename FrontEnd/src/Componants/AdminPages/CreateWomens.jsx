import React, { useContext, useState } from "react";
import { context } from "../../Context/Store";
import "./CreateWomens.scss";

const CreateWomens = () => {
    const { CreateProducts } = useContext(context);

    const [formData, setFormData] = useState({
        title: "",
        details: "",
        price: "",
        category: "",
        type: "",
        size: "",
        color: "",
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
    fileUpload.append("type", formData.type);

    return (
        <div className="create-product-container container py-5">
            <h2 className="text-center mb-4">Create Womens's Product</h2>
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
                        <option value="Womens">Womens</option>
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
                        <option value="Kurtas">Kurtas</option>
                        <option value="Sarees">Saares</option>
                        <option value="Dresses">Dresses</option>
                        <option value="Jeans">Jeans</option>
                        <option value="ShoesAndHeels">ShoesAndHeels</option>
                        <option value="HandBags">HandBags</option>
                    </select>
                </div>

                {/* Size */}
                <div className="mb-3">
                    <label htmlFor="size" className="form-label">Size</label>
                    <select
                        id="size"
                        className="form-select"
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Choose Size</option>
                        <option value="S">Small (S)</option>
                        <option value="M">Medium (M)</option>
                        <option value="L">Large (L)</option>
                        <option value="XL">Extra Large (XL)</option>
                    </select>
                </div>

                {/* Color */}
                <div className="mb-3">
                    <label htmlFor="color" className="form-label">Color</label>
                    <select
                        id="color"
                        className="form-select"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Choose Color</option>
                        <option value="Red">Red</option>
                        <option value="Blue">Blue</option>
                        <option value="Green">Green</option>
                        <option value="Black">Black</option>
                    </select>
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

export default CreateWomens;
