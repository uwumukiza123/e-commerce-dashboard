import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../actions/postActions';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, categories } = useSelector((state: any) => state.posts);

  const product = products.find((p: any) => p.id === id);

  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch<any>(fetchPosts());
    }
  }, [dispatch, products]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="bg-white w-3/4 p-6 rounded-md shadow-md text-blue-950 dark:text-white dark:bg-boxdark font-satoshi font-light">
      <div className="h-8 w-20 flex justify-center items-center mb-4 text-blue-700 font-bold">
        <div className="pr-1">←</div>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
      <div>
        <h1 className="text-4xl pb-2 font-medium">{product.title}</h1>
        <p className="grid text-lg">
          <div className="py-4">
            <strong>Description:</strong>
            <div className="border w-64 h-34 p-2 text-base">
              {product.description}
            </div>
          </div>
        </p>
        <p className="py-4 text-[18px]">
          <strong>Price:</strong>
          <div className="border w-64 px-2 text-base">${product.price}</div>
        </p>
        <p className="border w-64 text-lg flex items-center">
          <strong className="px-2 text-lg">Category:</strong>
          <div className="text-[15px]">
            {
              categories.find(
                (category: any) => category.id === product.categoryId,
              )?.name
            }
          </div>
        </p>
        <div className="border rounded-lg w-1/2 h-1/2">
          {product.imageUrl && (
            <img
              src={
                product.imageUrl.includes('/uploads/')
                  ? `${url}${product.imageUrl}`
                  : `${product.imageUrl}`
              }
              alt="product image"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
