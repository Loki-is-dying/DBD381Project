import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionPage from './Transactions'; // your transaction component
import './ViewOrders.css';

export default function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) fetchOrders();
  }, [userId]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/user/${userId}`);
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const onPaymentSuccess = () => {
    setSelectedOrder(null);
    fetchOrders();
  };

  if (!userId) return <p>Please log in to view your orders.</p>;

  if (selectedOrder) {
    return (
      <TransactionPage
        userId={userId}
        order={selectedOrder}
        onPaymentSuccess={onPaymentSuccess}
      />
    );
  }

  return (
    <div className="view-orders-container">
      <h1 className="orders-title">📦 Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-grid">
          {orders.map(order => (
            <div className="order-card" key={order._id}>
              <h3>Order ID: {order._id}</h3>
              <p><strong>Status:</strong> {order.status}</p>
              <ul>
                {order.products.map((item, i) => (
                  <li key={i}>
                    <strong>Product ID:</strong> {item.productId} <br />
                    <strong>Quantity:</strong> {item.quantity}
                  </li>
                ))}
              </ul>
              <p><strong>Total:</strong> ${order.total?.toFixed(2)}</p>

              {order.status === 'Pending' && (
                <button onClick={() => setSelectedOrder(order)}>Pay Now</button>
              )}

              {order.status === 'Paid' && (
                <button onClick={() => alert('Track order feature coming soon!')}>
                  Track Order
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
