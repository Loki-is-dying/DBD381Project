import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Categories from './pages/Categories';
import ViewOrders from './pages/ViewOrders';
import User from './pages/User';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/HomePage" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/ViewOrders" element={<ViewOrders />} />
        <Route path="/" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
