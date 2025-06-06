const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Create new product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:name', async (req,res)=>{
  try{
    const product = await Product.findOneAndDelete({name:req.params.name});
    if(!product) return res.status(404).json({error:'Product not found'});
    res.json(product);
    }catch(err){
      res.status(500).json({error:err.message});
      }
})

module.exports = router;
