import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostForm from '../components/Forms/PostForms';
import { fetchPosts, deletePost } from '../actions/postActions';

const Products: React.FC = () => {
  const { products, loading, categories } = useSelector(
    (state: any) => state.posts,
  );
  const [showPostForm, setShowPostForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const dispatch = useDispatch();

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

  return (
    <div>
      <div className="flex justify-end">
        <button
          onClick={togglePostForm}
          className="border rounded-md h-12 w-36"
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
        {products.map((product: any) => (
          <li key={product.id} className="pb-5 border-b">
            <div className="flex items-center justify-between">
              <h3
                onClick={() => setSelectedProduct(product)}
                className="cursor-pointer text-white hover:underline"
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
            {!showPostForm && selectedProduct?.id === product.id && (
              <div className="p-4 bg-gray-100 border rounded-md mt-2">
                <p>
                  <strong>Title:</strong> {product.title}
                </p>
                <p>
                  <strong>Description:</strong> {product.description}
                </p>
                <p>
                  <strong>Price:</strong> ${product.price}
                </p>
                <p>
                  <strong>Category:</strong>{' '}
                  {
                    categories.find(
                      (category: any) => category.id === product.categoryId,
                    )?.name
                  }
                </p>
                <img src={product.imageUrl} alt="product image" />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
