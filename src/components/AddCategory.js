import { useState } from "react";
import axios from "axios";
const AddCategory = ({ onCloseModal }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  const handleAddCat = async () => {
    const newCategory = {
      name: name,
      description: description,
      category_image: categoryImage,
    };
    console.log(newCategory);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/category`,
        newCategory
      );
      alert("Category added successfully!");
      onCloseModal();
    } catch (error) {
      console.log(error);
      alert("Failed to add category");
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white bg-opacity-70 backdrop-blur-lg p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Add Category</h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={categoryImage}
            onChange={(e) => setCategoryImage(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg"
          />
          <button
            type="button"
            onClick={handleAddCat}
            className="bg-blue-500 text-white p-2 rounded-lg"
          >
            Add Category
          </button>
          <button
            type="button"
            onClick={onCloseModal}
            className="text-red-500 mt-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
