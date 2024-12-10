import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PostForm from '../components/Forms/PostForms';

const Products: React.FC = () => {
  const posts = useSelector((state: any) => state.posts);

  const [showPostForm, setShowPostForm] = useState(false);

  const togglePostForm = () => {
    setShowPostForm((prev) => !prev);
  };

  console.log('posts', posts);
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
        {posts.posts.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
