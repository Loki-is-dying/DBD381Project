import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css';

export default function Orders() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState('664c1b2ea091e5b6fae7a8d2'); // Replace with actual user ID if needed
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addToCart = (product) => {
    const existing = cart.find((item) => item.productId === product._id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { productId: product._id, name: product.name, price: product.price, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, delta) => {
    setCart(
      cart
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const calculateTotal = () =>
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const placeOrder = async () => {
    try {
      const order = {
        userId,
        products: cart.map(({ productId, quantity }) => ({ productId, quantity })),
        total: calculateTotal(),
      };
      await axios.post('http://localhost:5000/api/orders', order);
      setMessage('✅ Order placed successfully!');
      setCart([]);
    } catch (err) {
      setMessage('❌ Failed to place order');
    }
  };

  return (
    <div className="orders-container">
      <h1 className="title">Create Order</h1>
      <div className="products-list">
        <h2>Available Products</h2>
        <div className="product-grid">
          {products.map((p) => (
            <div key={p._id} className="product-card">
              <h3>{p.name}</h3>
              <p><strong>Price:</strong> ${p.price}</p>
              <p><strong>Stock:</strong> {p.stock}</p>
              <button onClick={() => addToCart(p)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>

      <div className="cart-panel">
        <h2>🛒 Cart</h2>
        {cart.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.productId}>
                {item.name} (${item.price}) x {item.quantity}
                <button onClick={() => updateQuantity(item.productId, 1)}>+</button>
                <button onClick={() => updateQuantity(item.productId, -1)}>-</button>
              </li>
            ))}
          </ul>
        )}
        <h3>Total: ${calculateTotal()}</h3>
        <button className="place-order-btn" onClick={placeOrder} disabled={cart.length === 0}>
          Place Order
        </button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}
