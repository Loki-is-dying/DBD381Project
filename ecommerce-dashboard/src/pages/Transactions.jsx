import React, { useState } from 'react';
import axios from 'axios';

export default function TransactionPage({ userId, order, onPaymentSuccess }) {
  // Hooks called at top level — always, no matter what
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Early return if order not available, after hooks
  if (!order) return <p>Waiting for order details...</p>;

  const handlePayment = async () => {
    setIsProcessing(true);
    setMessage('');

    try {
      const transaction = {
        products: order.products,
        totalAmount: order.total,
        paymentMethod,
        paymentStatus: 'Paid',
        date: new Date(),
      };

      await axios.post('http://localhost:5000/api/transactions', {
        userId,
        transaction,
      });

      await axios.put(`http://localhost:5000/api/orders/${order._id}`, {
        status: 'Paid',
      });

      setMessage('Payment successful! Thank you.');
      onPaymentSuccess && onPaymentSuccess();
    } catch (err) {
      setMessage('Payment failed. Please try again.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="transaction-page">
      <h2>Pay for Order #{order._id}</h2>
      <p>Total Amount: ${order.total?.toFixed(2)}</p>

      <label>
        Select Payment Method:
        <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="PayPal">PayPal</option>
        </select>
      </label>

      <button onClick={handlePayment} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>

      {message && <p className="message">{message}</p>}
    </div>
  );
}
