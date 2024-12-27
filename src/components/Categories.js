import { useEffect, useState } from "react";
import axios from "axios";
import MyCategories from "./Category";

export const Categories = ({ onCategoryVisibilityChange }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/category`
        );
        setCategories(response.data.message);
      } catch (error) {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleVisibilityChange = (categoryName, isVisible) => {
    onCategoryVisibilityChange?.(categoryName, isVisible);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      {categories.map((category) => (
        <MyCategories
          key={category.id}
          categoryName={category.name}
          onVisibilityChange={(isVisible) =>
            handleVisibilityChange(category.name, isVisible)
          }
        />
      ))}
    </div>
  );
};
