import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Ecommerce Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      <div className="nav-links">
        <Link to="/products">Manage Products</Link>
        <Link to="/orders">Manage Orders</Link>
        <Link to="/categories">Manage Categories</Link>
        <Link to="/ViewOrders">View Orders</Link>
      </div>
    </div>
  );
}
