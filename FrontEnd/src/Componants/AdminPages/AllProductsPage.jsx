import React, { useContext, useEffect, useState } from "react";
import { context } from "../../Context/Store";
import "./AllProductsPage.scss";

const AllProductsPage = () => {
    const { allProducts, fetchAllProducts, deleteProducts, EditProducts } = useContext(context);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [editingProductId, setEditingProductId] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        fetchAllProducts();
    }, []);

    useEffect(() => {
        if (selectedCategory === "All") {
            setFilteredProducts(allProducts);
        } else {
            const filtered = allProducts.filter(
                (product) =>
                    product.category.toLowerCase() === selectedCategory.toLowerCase()
            );
            setFilteredProducts(filtered);
        }
    }, [selectedCategory, allProducts]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleEdit = (product) => {
        setEditingProductId(product._id);
        setFormData({ ...product }); // Pre-fill the form with the existing product data
    };

    const handleUpdate = (productId) => {
        EditProducts(productId, formData);
        setEditingProductId(null); // Exit editing mode after updating
    };

    const handleDelete = (productId) => {
        deleteProducts(productId);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="products-container">
            <h1 className="products-title">All Products</h1>

            {/* Category Filter */}
            <div className="filter-container">
                <label htmlFor="category-filter">Filter by Category: </label>
                <select
                    id="category-filter"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="All">All</option>
                    <option value="Mens">Mens</option>
                    <option value="Womens">Womens</option>
                    <option value="Kids">Kids</option>
                </select>
            </div>

            <table className="products-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Details</th>
                        <th>Colors</th>
                        <th>Sizes</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Rating</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <tr key={product._id}>
                                <td>
                                    <img
                                        src={product.imageUrl}
                                        alt={product.title}
                                        className="product-image"
                                    />
                                </td>
                                <td>
                                    {editingProductId === product._id ? (
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        product.title
                                    )}
                                </td>
                                <td>
                                    {editingProductId === product._id ? (
                                        <input
                                            type="text"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        product.category
                                    )}
                                </td>
                                <td>
                                    {editingProductId === product._id ? (
                                        <input
                                            type="text"
                                            name="type"
                                            value={formData.type}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        product.type
                                    )}
                                </td>
                                <td>
                                    {editingProductId === product._id ? (
                                        <input
                                            type="text"
                                            name="details"
                                            value={formData.details}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        product.details
                                    )}
                                </td>
                                <td>
                                    {editingProductId === product._id ? (
                                        <input
                                            type="text"
                                            name="colors"
                                            value={formData.colors}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        product.colors
                                    )}
                                </td>
                                <td>
                                    {editingProductId === product._id ? (
                                        <input
                                            type="text"
                                            name="sizes"
                                            value={formData.sizes}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        product.sizes
                                    )}
                                </td>
                                <td>
                                    {editingProductId === product._id ? (
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        `₹${product.price}`
                                    )}
                                </td>
                                <td>
                                    {editingProductId === product._id ? (
                                        <input
                                            type="number"
                                            name="qty"
                                            value={formData.qty}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        product.qty
                                    )}
                                </td>
                                <td>{product.rating} ⭐</td>
                                <td>
                                    {editingProductId === product._id ? (
                                        <button
                                            className="update-btn"
                                            onClick={() => handleUpdate(product._id)}
                                        >
                                            Update
                                        </button>
                                    ) : (
                                        <button
                                            className="edit-btn"
                                            onClick={() => handleEdit(product)}
                                        >
                                            Edit
                                        </button>
                                    )}
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="11" className="no-products">
                                No products found for the selected category.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AllProductsPage;
