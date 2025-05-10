import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostCategories from '../components/Forms/PostCategories';
import { useNavigate } from 'react-router-dom';
import { fetchCategories, deleteCategory } from '../actions/postActions';
import ConfirmDialog from '../components/ui/Dialog';

const Categories: React.FC = () => {
  const { categories, loading } = useSelector((state: any) => state.posts);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch<any>(fetchCategories());
  }, [dispatch]);

  const togglePostForm = () => {
    setShowCategoryForm((prev) => !prev);
    setSelectedCategory(null);
  };

  const handleDeleteClick = (id: string) => {
    setCategoryToDelete(id);
    setIsDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (categoryToDelete) {
      await dispatch<any>(deleteCategory(categoryToDelete));
      setCategoryToDelete(null);
      setIsDialogOpen(false);
      dispatch<any>(fetchCategories());
    }
  };

  const openCategoryDetails = (categoryId: string) => {
    navigate(`/categories/${categoryId}`);
  };

  return (
    <div className="bg-white px-8 shadow-2xl rounded-lg dark:bg-boxdark">
      <div className="flex justify-end">
        <button
          onClick={togglePostForm}
          className="border rounded-md h-12 w-36 mt-4 text-blue-950 dark:text-white font-satoshi font-medium"
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
            dispatch<any>(fetchCategories());
          }}
        />
      )}
      <ul>
        {categories.length === 0 && !loading && <p>No products available</p>}
        {!showCategoryForm && (
          <div>
            <div className="border-b">
              <h1 className="pb-5 text-2xl font-medium font-satoshi text-blue-950 dark:text-white">
                Categories
              </h1>
            </div>
            {categories.map((category: any) => (
              <li
                key={category.id}
                className="pb-5 border-b text-blue-950 dark:text-white font-satoshi font-light"
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
                      onClick={() => handleDeleteClick(category.id)}
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
      <ConfirmDialog
        isOpen={isDialogOpen}
        title="Delete Category?"
        message="Are you sure you want to delete this category? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default Categories;
