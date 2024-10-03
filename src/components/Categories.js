import { useEffect, useState } from "react";
import useSWR from "swr";
import MyCategories from "./Category";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const Categories = () => {
  const [categories, setCategories] = useState();
  const { data, error, isLoading } = useSWR(
    `http://localhost:5050/category`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <h1>Categories</h1>
      {data.message.map((category) => {
        return <MyCategories key={category.id} categoryName={category.name} />;
      })}
    </div>
  );
};
