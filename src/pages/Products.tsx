import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostForm from '../components/Forms/PostForms';
import { useNavigate } from 'react-router-dom';
import { fetchPosts, deletePost } from '../actions/postActions';

const Products: React.FC = () => {
  const { products, loading } = useSelector((state: any) => state.posts);
  const [showPostForm, setShowPostForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log('data', products);

  useEffect(() => {
    dispatch<any>(fetchPosts());
  }, [dispatch]);

  const togglePostForm = () => {
    setShowPostForm((prev) => !prev);
    setSelectedProduct(null);
  };

  const deleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await dispatch<any>(deletePost(id));
    }
  };

  const openProductDetails = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="bg-white px-8 shadow-2xl rounded-lg">
      <div className="flex justify-end">
        <button
          onClick={togglePostForm}
          className="border rounded-md h-12 w-36 mt-4 text-blue-950 font-satoshi font-medium"
        >
          {showPostForm ? 'Cancel' : 'Add Product'}
        </button>
      </div>
      {showPostForm && (
        <PostForm
          editingProduct={selectedProduct}
          onSuccess={() => {
            setShowPostForm(false);
            setSelectedProduct(null);
          }}
        />
      )}
      <ul>
        {products.length === 0 && !loading && <p>No products available</p>}
        {!showPostForm &&
          products.map((product: any) => (
            <li
              key={product.id}
              className="pb-5 border-b text-blue-950 font-satoshi font-light"
            >
              <div className="flex items-center justify-between">
                <h3
                  onClick={() => openProductDetails(product.id)}
                  className="cursor-pointer hover:underline text-[18px]"
                >
                  {product.title}
                </h3>
                <div className="mt-4">
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowPostForm(true);
                    }}
                    className="mr-2 border rounded-md px-3 py-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="border rounded-md px-3 py-1 text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Products;
