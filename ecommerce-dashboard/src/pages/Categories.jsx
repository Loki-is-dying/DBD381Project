import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Categories.css';
import { Plus, Folder } from 'lucide-react';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err.message);
      setError('Could not load categories.');
    }
  };

  const addCategory = async () => {
    if (!newCategory.trim()) {
      setError('Category name cannot be empty.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/categories', { name: newCategory });
      setNewCategory('');
      setError('');
      fetchCategories();
    } catch (err) {
      console.error('Error adding category:', err.message);
      setError('Failed to add category.');
    }
  };

  return (
    <div className="categories-container">
      <h1 className="page-title">📁 Product Categories</h1>

      <div className="form-section">
        <div className="input-group">
          <label htmlFor="category-input" className="input-label">
            Category Name
          </label>
          <input
            id="category-input"
            type="text"
            placeholder="Enter new category..."
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="category-input"
          />
        </div>
        <button onClick={addCategory} className="add-btn">
          <Plus className="icon" /> Add Category
        </button>
      </div>


      {error && <p className="error-message">{error}</p>}

      <ul className="category-list">
        {categories.map((cat) => (
          <li key={cat._id} className="category-item">
            <Folder className="folder-icon" /> {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
