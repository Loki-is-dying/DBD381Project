import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Categories from './pages/Categories';
import ViewOrders from './pages/ViewOrders';
import User from './pages/User';
import Transactions from './pages/Transactions';
import Reviews from './pages/Reviews';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/HomePage" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/ViewOrders" element={<ViewOrders />} />
        <Route path="/Transactions" element={<Transactions />} />
        <Route path="/Reviews" element={<Reviews />} />
      </Routes>
    </Router>
  );
}

export default App;
