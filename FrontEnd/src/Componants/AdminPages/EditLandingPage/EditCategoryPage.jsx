
import { useContext, useState } from 'react';
import { context } from '../../../Context/Store';
import "./EditCategory.scss";
import IsAuthorized from '../../../utils/IsAuthorized';


const EditCategoryPage = () => {
    const { UserData, editNewCategory, AllCategories, addNewCategory, DeleteCategories, setStore } = useContext(context);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);

    IsAuthorized();

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
                // Update the edited category in the state
                setStore(prevState => ({
                    ...prevState,
                    AllCategories: prevState.AllCategories.map(cat =>
                        cat._id === categoryId ? { ...cat, title, img: URL.createObjectURL(image) } : cat
                    )
                }));
            } else {
                await addNewCategory(e, formData);
                // Update the categories after adding a new one
                setStore(prevState => ({
                    ...prevState,
                    AllCategories: [...prevState.AllCategories, { _id: Date.now(), title, img: URL.createObjectURL(image) }]
                }));
                setIsAddingNew(false);
                setEditingCategoryId(null);
                setTitle("");
                setImage(null);
            }
        } catch (error) {
            console.error("Error during submission:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (e, categoryId) => {
        e.preventDefault();
        DeleteCategories(categoryId);
        // Remove the deleted category from the state
        setStore(prevState => ({
            ...prevState,
            AllCategories: prevState.AllCategories.filter(cat => cat._id !== categoryId)
        }));
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
                                    <form encType="multipart/form-data" onSubmit={(e) => handleSubmit(e, ele._id)}>
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
                                    <>
                                        <img src={ele.img} alt={ele.title} />
                                        <h5>{ele.title}</h5>
                                        <button
                                            className="btn"
                                            onClick={() => handleEdit(ele)}
                                        >
                                            Edit
                                        </button>
                                        <button className="btn" onClick={(e) => handleDelete(e, ele._id)}>Delete</button>
                                    </>
                                )}
                            </div>
                        ))}
                        {isAddingNew ? (
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
                                    onClick={() => setIsAddingNew(false)}
                                >
                                    Cancel
                                </button>
                            </form>
                        ) : (
                            <button
                                className="btn"
                                onClick={() => {
                                    setIsAddingNew(true);
                                    setEditingCategoryId(null);
                                    setTitle("");
                                    setImage(null);
                                }}
                            >
                                Add New Category
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditCategoryPage;
