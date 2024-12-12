import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../actions/postActions';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

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
      <img src={`${url}${product.imageUrl}`} alt="product" className="mt-4" />
    </div>
  );
};

export default ProductDetails;
