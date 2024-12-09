import React from 'react';
import { useSelector } from 'react-redux';
import PostForm from '../../components/Forms/PostForms';

const ECommerce: React.FC = () => {
  const posts = useSelector((state: any) => state.posts);
  console.log('posts', posts);
  return (
    <div>
      <h1>Dashboard</h1>
      <PostForm />
      <ul>
        {posts.posts.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ECommerce;
