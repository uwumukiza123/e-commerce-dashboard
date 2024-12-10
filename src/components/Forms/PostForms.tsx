import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { createPost, fetchCategories } from '../../actions/postActions';

const PostForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      setLoading(true);
      try {
        const categoryData = await dispatch(fetchCategories()).unwrap();
        setCategories(categoryData);
      } catch (err: any) {
        setError(err.message || 'Error fetching categories');
      } finally {
        setLoading(false);
      }
    };
    fetchCategoriesData();
  }, [dispatch]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(
        createPost({
          title,
          description,
          price,
          categoryId: String(selectedCategory),
          imageUrl,
        }),
      ).unwrap();

      setTitle('');
      setDescription('');
      setPrice('');
      setSelectedCategory('');
      setImageUrl(null);
    } catch (err: any) {
      console.error('Error creating post:', err.message || err);
      setError(err.message || 'Error creating post');
    }
  };

  const CategoryDropdown = useCallback(
    ({
      categories,
      selectedCategory,
      onChange,
    }: {
      categories: { id: string; name: string }[];
      selectedCategory: string;
      onChange: React.ChangeEventHandler<HTMLSelectElement>;
    }) => (
      <select value={selectedCategory} onChange={onChange}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    ),
    [],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white w-3/4 p-6 rounded-md shadow-md"
    >
      <div>
        <div className="grid">
          <label htmlFor="title">Title:</label>
          <input
            className="border border-blue-950 w-64"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="grid">
          <label htmlFor="description">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-blue-950 w-64"
            rows={4}
            required
          />
        </div>
        <div className="grid">
          <label htmlFor="price">Price:</label>
          <input
            className="border border-blue-950 w-64"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="py-4">
          <div className="border w-64 border-blue-950">
            <CategoryDropdown
              categories={categories}
              selectedCategory={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            />
          </div>
        </div>
        <div>
          <input type="file" onChange={handleFileChange} />
        </div>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Product Preview"
            style={{ maxWidth: '100%' }}
          />
        )}
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="py-4">
          <button
            className="h-10 w-36 border border-blue-950 rounded-md"
            type="submit"
            disabled={
              loading || !title || !description || !price || !selectedCategory
            }
          >
            {loading ? 'Submitting...' : 'Create Post'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
