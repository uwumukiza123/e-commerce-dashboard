import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../actions/postActions';

const CategoryDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const { categories } = useSelector((state: any) => state.posts);

  const category = categories.find((p: any) => p.id === id);

  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch<any>(fetchCategories());
    }
  }, [dispatch, categories]);

  if (!categories) return <p>Loading...</p>;

  return (
    <div className="bg-white w-3/4 p-6 rounded-md shadow-md text-blue-950 font-satoshi font-light">
      <h1 className="text-4xl pb-2 font-medium">{category.name}</h1>
      <p className="grid text-lg">
        <div className="py-4">
          <strong>Description:</strong>
          <div className="border w-64 h-34 p-2 text-base">
            {category.description}
          </div>
        </div>
      </p>
      <div className="border rounded-lg w-1/2 h-1/2">
        <img
          src={`${url}${category.imageUrl}`}
          alt="category"
          className="p-2"
        />
      </div>
    </div>
  );
};

export default CategoryDetails;
