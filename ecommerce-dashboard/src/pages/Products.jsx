import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
    category: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    try {
      await axios.post('http://localhost:5000/api/products', form);
      setMessage('✅ Product added successfully!');
      setError('');
      setForm({ name: '', price: '', stock: '', description: '', category: '' });
      fetchProducts();
    } catch (err) {
      setError('❌ Failed to add product');
      setMessage('');
    }
  };

  const deleteProduct = async (name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${name}`);
      fetchProducts();
    } catch (err) {
      setError('❌ Failed to delete product');
    }
  };

  return (
    <div className="products-container">
      <h1 className="title">Product Management</h1>

      <div className="form-container">
        <h2>Add New Product</h2>
        <div className="form-fields">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" />
          <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" type="number" />
          <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
          <input name="category" value={form.category} onChange={handleChange} placeholder="Category" />
        </div>
        <button className="add-btn" onClick={addProduct}>Add Product</button>
        {message && <div className="success">{message}</div>}
        {error && <div className="error">{error}</div>}
      </div>

      <div className="table-container">
        <h2>All Products</h2>
        <table className="products-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price ($)</th>
              <th>Stock</th>
              <th>Description</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td>{p.description || '-'}</td>
                <td>{p.category || '-'}</td>
                <td>
                  <button className="delete-btn" onClick={() => deleteProduct(p.name)}>Delete</button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="empty-msg">No products available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
