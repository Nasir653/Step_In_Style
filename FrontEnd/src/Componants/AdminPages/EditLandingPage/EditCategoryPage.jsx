
import { useContext, useState } from 'react';
import { context } from '../../../Context/Store';
import "./EditCategory.scss";


const EditCategoryPage = () => {


    const { editNewCategory, AllCategories, addNewCategory } = useContext(context);

    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);

    const handleEdit = (category) => {
        setEditingCategoryId(category._id);
        setIsAddingNew(false);
        setTitle(category.title);
        setImage(null);
    };

    const handleSubmit = async (e, categoryId = null) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("image", image);

        setLoading(true);
        try {
            if (categoryId) {
                await editNewCategory(e, formData, categoryId);
            } else {
                await addNewCategory(e, formData); // Add a new category
                setIsAddingNew(false); // Close "Add New" form after submission
            }
            setEditingCategoryId(null); // Reset editing state after submission
            setTitle(""); // Reset title field
            setImage(null); // Reset image field
        } catch (error) {
            console.error("Error during submission:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>

            <div className="container-fluid">

                <h2>All Category</h2>
                <div className="items-category">
                    <div className="row gap-5">

                        {AllCategories.map((ele) => (
                            <div key={ele._id}>
                                {editingCategoryId === (ele._id) ? (

                                    <form
                                        encType="multipart/form-data"
                                        onSubmit={(e) => handleSubmit(e, ele._id)}
                                    >


                                        <input
                                            type="text"
                                            name="title"
                                            value={title}
                                            placeholder="Enter title"
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                        <input
                                            type="file"
                                            onChange={(e) => setImage(e.target.files[0])}
                                        />
                                        <button
                                            type="submit"
                                            className="btn"
                                            disabled={loading}
                                        >
                                            {loading ? "Submitting..." : "Submit"}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn"
                                            onClick={() => setEditingCategoryId(null)}
                                        >
                                            Cancel
                                        </button>
                                    </form>
                                ) : (
                                    // Display category
                                    <>
                                        <img src={ele.img} alt={ele.title} />
                                        <h5>{ele.title}</h5>
                                        <button
                                            className="btn"
                                            onClick={() => handleEdit(ele)}
                                        >
                                            Edit
                                        </button>
                                        <button className="btn">Delete</button>
                                    </>
                                )}
                            </div>
                        ))}

                        {/* Add New Category Button */}
                        {isAddingNew ? (
                            // Add new category form
                            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="title"
                                    value={title}
                                    placeholder="Enter title"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <input
                                    type="file"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                                <button
                                    type="submit"
                                    className="btn"
                                    disabled={loading}
                                >
                                    {loading ? "Adding..." : "Add"}
                                </button>
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => setIsAddingNew(false)} // Close form on cancel
                                >
                                    Cancel
                                </button>
                            </form>
                        ) : (
                            // Show button to open add new form
                            <button
                                className="btn"
                                onClick={() => {
                                    setIsAddingNew(true);
                                    setEditingCategoryId(null); // Close any editing forms
                                    setTitle(""); // Clear title input
                                    setImage(null); // Clear image input
                                }}
                            >
                                Add New Category
                            </button>
                        )}
                    </div>
                </div>
            </div>


        </>
    )
}

export default EditCategoryPage