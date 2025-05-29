import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Transactions';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    userId: '',
    amount: '',
    currency: 'USD',
    type: 'deposit'
  });
  const [message, setMessage] = useState('');

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/transactions');
      setTransactions(res.data);
    } catch (err) {
      setMessage('Failed to fetch transactions');
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleChange = (e) => {
    setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value });
  };

  const addTransaction = async () => {
    try {
      await axios.post('http://localhost:5000/api/transactions', newTransaction);
      setMessage('Transaction added!');
      setNewTransaction({ userId: '', amount: '', currency: 'USD', type: 'deposit' });
      fetchTransactions();
    } catch (err) {
      setMessage('Failed to add transaction');
    }
  };

  return (
    <div className="container">
      <h1>Transactions</h1>

      <div>
        <input name="userId" placeholder="User ID" value={newTransaction.userId} onChange={handleChange} />
        <input name="amount" placeholder="Amount" value={newTransaction.amount} onChange={handleChange} type="number" />
        <input name="currency" placeholder="Currency" value={newTransaction.currency} onChange={handleChange} />
        <select name="type" value={newTransaction.type} onChange={handleChange}>
          <option value="deposit">Deposit</option>
          <option value="purchase">Purchase</option>
        </select>
        <button onClick={addTransaction}>Add Transaction</button>
      </div>

      <p>{message}</p>

      <ul>
        {transactions.map((tx, index) => (
          <li key={index}>
            <strong>{tx.type}</strong>: {tx.amount} {tx.currency} (User ID: {tx.userId})
          </li>
        ))}
      </ul>
    </div>
  );
}
