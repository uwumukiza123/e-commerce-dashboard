import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostCategories from '../components/Forms/PostCategories';
import { useNavigate } from 'react-router-dom';
import { fetchCategories, deleteCategory } from '../actions/postActions';

const Categories: React.FC = () => {
  const { categories, loading } = useSelector((state: any) => state.posts);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log('category', categories);

  useEffect(() => {
    dispatch<any>(fetchCategories());
  }, [dispatch]);

  const togglePostForm = () => {
    setShowCategoryForm((prev) => !prev);
    setSelectedCategory(null);
  };

  const deleteCategories = async (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      await dispatch<any>(deleteCategory(id));
    }
  };

  const openCategoryDetails = (categoryId: string) => {
    navigate(`/categories/${categoryId}`);
  };

  return (
    <div className="bg-white px-8 shadow-2xl rounded-lg">
      <div className="flex justify-end">
        <button
          onClick={togglePostForm}
          className="border rounded-md h-12 w-36 mt-4 text-blue-950 font-satoshi font-medium"
        >
          {showCategoryForm ? 'Cancel' : 'Add Category'}
        </button>
      </div>
      {showCategoryForm && (
        <PostCategories
          editingProduct={selectedCategory}
          onSuccess={() => {
            setShowCategoryForm(false);
            setSelectedCategory(null);
          }}
        />
      )}
      <ul>
        {categories.length === 0 && !loading && <p>No products available</p>}
        {!showCategoryForm && (
          <div>
            <div className="border-b">
              <h1 className="pb-5 text-2xl font-medium font-satoshi text-blue-950">
                Categories
              </h1>
            </div>
            {categories.map((category: any) => (
              <li
                key={category.id}
                className="pb-5 border-b text-blue-950 font-satoshi font-light"
              >
                <div className="flex items-center justify-between">
                  <h3
                    onClick={() => openCategoryDetails(category.id)}
                    className="cursor-pointer hover:underline text-[18px]"
                  >
                    {category.name}
                  </h3>
                  <div className="mt-4">
                    <button
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowCategoryForm(true);
                      }}
                      className="mr-2 border rounded-md px-3 py-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategories(category.id)}
                      className="border rounded-md px-3 py-1 text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </div>
        )}
      </ul>
    </div>
  );
};

export default Categories;
