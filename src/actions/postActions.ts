import { createAsyncThunk } from '@reduxjs/toolkit';

type ProductsData = {
  title: string;
  description: string;
  price: string;
  categoryId: string;
  imageUrl: string | null;
};

const url = import.meta.env.VITE_API_URL;

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('unauthorized: no token found');
  }
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData: ProductsData, { rejectWithValue }) => {
    try {
      const response = await fetchWithAuth(`${url}/api/products`, {
        method: 'POST',
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      console.log('post data:', postData);

      return await response.json();
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to create post');
    }
  },
);

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${url}/api/products`);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return response.json();
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch posts');
    }
  },
);

export const fetchCategories = createAsyncThunk(
  'posts/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${url}/api/categories`);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch categories');
    }
  },
);
