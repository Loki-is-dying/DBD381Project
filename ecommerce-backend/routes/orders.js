const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Retrieve all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
    res.status(201).json(orders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create new order
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all orders for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order status
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Delete order

router.delete('/:id', async (req,res)=>{
  try{
    const order = await Order.findByIdAndDelete(req.params.id)
    res.json(order)
    }catch(err){
      res.status(400).json({error:err.message})
  }
});

module.exports = router;
