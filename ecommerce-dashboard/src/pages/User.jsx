import React, { useState } from 'react';
import axios from 'axios';
import './User.css';
import { useNavigate } from 'react-router-dom';

export default function User() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoginMode, setIsLoginMode] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLoginMode ? '/users/login' : '/users/register';

    try {
      const response = await axios.post(`http://localhost:5000/api${endpoint}`, formData);
      localStorage.setItem('userId', response.data._id); // Save ID for access
      navigate('/HomePage'); // Redirect after login/register
    } catch (err) {
      alert(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="user-container">
      <div className="form-box">
        <h2>{isLoginMode ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLoginMode && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{isLoginMode ? 'Login' : 'Register'}</button>
        </form>
        <p onClick={() => setIsLoginMode(!isLoginMode)} style={{ cursor: 'pointer', color: 'blue' }}>
          {isLoginMode ? 'Need an account? Register here' : 'Have an account? Login here'}
        </p>
      </div>
    </div>
  );
}
