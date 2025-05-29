import React, { useState } from 'react';
import axios from 'axios';
import './Transactions.css';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function TransactionPage({ userId, order, onPaymentSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!order) return <p className="text-center text-gray-500 mt-10">Waiting for order details...</p>;

  const handlePayment = async () => {
    setIsProcessing(true);
    setMessage('');
    setMessageType('');

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
      setMessageType('success');
      onPaymentSuccess && onPaymentSuccess();
    } catch (err) {
      setMessage('Payment failed. Please try again.');
      setMessageType('error');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="transaction-container">
      <h2 className="transaction-title">Pay for Order #{order._id}</h2>

      <p className="transaction-total">
        Total Amount: <span>${order.total?.toFixed(2)}</span>
      </p>

      <div>
        <label className="transaction-label">Select Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={e => setPaymentMethod(e.target.value)}
          className="transaction-select"
        >
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="PayPal">PayPal</option>
        </select>
      </div>

      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className="transaction-button"
      >
        {isProcessing ? (
          <>
            <Loader2 className="animate-spin mr-2 w-5 h-5" />
            Processing...
          </>
        ) : (
          'Pay Now'
        )}
      </button>

      {message && (
        <div
          className={`transaction-message ${
            messageType === 'success' ? 'message-success' : 'message-error'
          }`}
        >
          {messageType === 'success' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
          {message}
        </div>
      )}
    </div>
  );
}
