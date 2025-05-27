import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Categories.css';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err.message);
    }
  };

  const addCategory = async () => {
    try {
      await axios.post('http://localhost:5000/api/categories', { name: newCategory });
      setNewCategory('');
      fetchCategories();
    } catch (err) {
      console.error('Error adding category:', err.message);
    }
  };

  return (
    <div className="categories-container">
      <h1>Categories</h1>
      <input
        type="text"
        placeholder="New category name"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <button onClick={addCategory}>Add Category</button>

      <ul>
        {categories.map((cat) => (
          <li key={cat._id}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
}
