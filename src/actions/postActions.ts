import { createAsyncThunk } from '@reduxjs/toolkit';

type ProductsData = {
  title: string;
  description: string;
  price: string;
  categoryId: string;
  imageUrl: string | null;
};

type CategoriesData = {
  name: string;
  description: string;
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
      const data = await response.json();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch posts');
    }
  },
);

export const updatePost = createAsyncThunk(
  'post/updatePost',
  async (postData: ProductsData & { id: string }, { rejectWithValue }) => {
    try {
      const response = await fetchWithAuth(
        `${url}/api/products/${postData.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(postData),
        },
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to update post');
    }
  },
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetchWithAuth(`${url}/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      console.log('response: ', id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to delete post');
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

export const createCategories = createAsyncThunk(
  'posts/createCategories',
  async (postCategories: CategoriesData, { rejectWithValue }) => {
    try {
      const response = await fetchWithAuth(`${url}/api/categories`, {
        method: 'POST',
        body: JSON.stringify(postCategories),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to create category');
    }
  },
);

export const updateCategory = createAsyncThunk(
  'posts/updateCategory',
  async (
    postCategories: CategoriesData & { id: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetchWithAuth(
        `${url}/api/categories/${postCategories.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(postCategories),
        },
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to update category');
    }
  },
);

export const deleteCategory = createAsyncThunk(
  'posts/deletecategory',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetchWithAuth(`${url}/api/categories/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      console.log('response: ', id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to delete category');
    }
  },
);
