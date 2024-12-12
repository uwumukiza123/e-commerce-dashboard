import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { createCategories, updateCategory } from '../../actions/postActions';

const PostCategories = ({
  editingProduct,
  onSuccess,
}: {
  editingProduct?: any;
  onSuccess?: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name || '');
      setDescription(editingProduct.description || '');
      setImageUrl(editingProduct.imageUrl || null);
    }
  }, [editingProduct]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = setImageUrl(URL.createObjectURL(file));
      return `upload/${result}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (editingProduct) {
        await dispatch(
          updateCategory({
            id: editingProduct.id,
            name,
            description,
            imageUrl,
          }),
        ).unwrap();
      } else {
        await dispatch(
          createCategories({
            name,
            description,
            imageUrl,
          }),
        ).unwrap();
      }
      onSuccess?.();
      setName('');
      setDescription('');
      setImageUrl(null);
    } catch (err: any) {
      console.error('Error saving post:', err.message || err);
      setError(err.message || 'Error saving post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white w-3/4 p-6 rounded-md shadow-md text-blue-950 font-light"
    >
      <div>
        <div className="grid py-2">
          <label htmlFor="title">Name:</label>
          <input
            className="border w-64 px-2 text-blue-950"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="grid py-2">
          <label htmlFor="description">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border w-64 px-2 text-blue-950"
            rows={4}
            required
          />
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
            className="h-10 w-36 border border-blue-950 rounded-md text-blue-950"
            type="submit"
            disabled={loading || !name || !description}
          >
            {loading
              ? 'Submitting...'
              : editingProduct
              ? 'Update Post'
              : 'Create Post'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostCategories;
