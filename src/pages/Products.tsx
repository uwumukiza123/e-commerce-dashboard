import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostProducts from '../components/Forms/PostProducts';
import { useNavigate } from 'react-router-dom';
import { fetchPosts, deletePost } from '../actions/postActions';
import ConfirmDialog from '../components/ui/Dialog';

const Products: React.FC = () => {
  const { products, loading } = useSelector((state: any) => state.posts);
  const [showPostForm, setShowPostForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const category = useSelector((state: any) => state.posts);

  useEffect(() => {
    dispatch<any>(fetchPosts());
  }, [dispatch]);

  const togglePostForm = () => {
    setShowPostForm((prev) => !prev);
    setSelectedProduct(null);
  };

  const handleDeleteCLick = (id: string) => {
    setProductToDelete(id);
    setIsDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      await dispatch<any>(deletePost(productToDelete));
      setProductToDelete(null);
      setIsDialogOpen(false);
      dispatch<any>(fetchPosts());
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
        <PostProducts
          editingProduct={selectedProduct}
          onSuccess={() => {
            setShowPostForm(false);
            setSelectedProduct(null);
            dispatch<any>(fetchPosts());
          }}
        />
      )}
      <ul>
        {products.length === 0 && !loading && <p>No products available</p>}
        {!showPostForm && (
          <div>
            <div className="border-b">
              <h1 className="pb-5 text-2xl font-medium font-satoshi text-blue-950">
                Products
              </h1>
            </div>
            {products.map((product: any) => (
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
                      onClick={() => handleDeleteCLick(product.id)}
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
        title="Delete Product?"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default Products;
