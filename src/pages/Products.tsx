import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostForm from '../components/Forms/PostForms';
import { fetchPosts } from '../actions/postActions';
import { useNavigate } from 'react-router-dom';

const Products: React.FC = () => {
  const { products, loading, categories } = useSelector(
    (state: any) => state.posts,
  );
  const [showPostForm, setShowPostForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const dispatch = useDispatch();

  const navigation = useNavigate();
  console.log('navigation', navigation);

  useEffect(() => {
    dispatch<any>(fetchPosts());
  }, [dispatch]);

  const togglePostForm = () => {
    setShowPostForm((prev) => !prev);
  };

  const handleProductClick = (product: any) => {
    setSelectedProduct((prev: any) =>
      prev?.id === product.id ? null : product,
    );
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
      {showPostForm && <PostForm />}
      <ul>
        {products.length === 0 && !loading && <p>No products available</p>}
        {products.map((product: any) => (
          <li key={product.id} className="mb-4">
            <h3
              onClick={() => handleProductClick(product)}
              className={`cursor-pointer text-blue-600 hover:underline ${
                showPostForm ? 'pointer-events-none opacity-50' : ''
              }`}
            >
              {product.title}
            </h3>
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
                  {categories.map(
                    (category: any) =>
                      product.categoryId === category.id && (
                        <p>{category.name} </p>
                      ),
                  )}
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
