const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transactions');

// Add a transaction
router.post('/', async (req, res) => {
  try {
    const { userId, transaction } = req.body;
    const newTrans = await Transaction.findOneAndUpdate(
      { userId },
      { $push: { transactions: transaction } },
      { upsert: true, new: true }
    );
    res.status(201).json(newTrans);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// View all transactions
router.get('/', async (req, res) => {
  try {
    const all = await Transaction.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a transaction by userId and index
router.put('/:userId/:index', async (req, res) => {
  try {
    const { userId, index } = req.params;
    const updateData = req.body;

    const transactionDoc = await Transaction.findOne({ userId });
    if (!transactionDoc) return res.status(404).json({ error: 'Transaction not found' });

    if (index >= transactionDoc.transactions.length) {
      return res.status(400).json({ error: 'Invalid transaction index' });
    }

    transactionDoc.transactions[index] = {
      ...transactionDoc.transactions[index],
      ...updateData
    };

    await transactionDoc.save();
    res.json(transactionDoc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a transaction by userId and index
router.delete('/:userId/:index', async (req, res) => {
  try {
    const { userId, index } = req.params;

    const transactionDoc = await Transaction.findOne({ userId });
    if (!transactionDoc) return res.status(404).json({ error: 'Transaction not found' });

    transactionDoc.transactions.splice(index, 1);
    await transactionDoc.save();

    res.json({ message: 'Transaction deleted', transactionDoc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
