import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../actions/postActions';

const CategoryDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="bg-white w-3/4 p-6 rounded-md shadow-md text-blue-950 font-satoshi font-light dark:bg-boxdark dark:text-white">
      <div>
        <div className="h-8 mb-4 text-blue-700 font-bold">
          <button onClick={() => navigate(-1)} className="flex">
            <div className="pr-1">←</div>
            <p>Back</p>
          </button>
        </div>
        <h1 className="text-4xl pb-2 font-medium">{category.name}</h1>
        <p className="grid text-lg">
          <div className="py-4">
            <strong>Description:</strong>
            <div className="border w-64 h-34 p-2 text-base">
              {category.description}
            </div>
          </div>
        </p>
        <div>
          {category.imageUrl && (
            <img
              src={
                category.imageUrl.includes('/uploads/')
                  ? `${url}${category.imageUrl}`
                  : `${category.imageUrl}`
              }
              alt="product image"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
