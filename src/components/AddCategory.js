import { useState } from "react";
const handleAddCat = async () => {
  const newCategory = {
    name: name,
    description: description,
    category_image: category_image,
  };
  console.log(newCategory);
  try {
    await axios.post("http://localhost:5050/transaction", newTransaction);
    alert("Transaction added successfully!");
  } catch (error) {
    console.log(error);
    alert("Failed to add transaction");
  }
};

const AddCategory = () => {
  return <div></div>;
};
