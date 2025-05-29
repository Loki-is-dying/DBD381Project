// routes/reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Reviews');

// Create or Add a review
router.post('/', async (req, res) => {
  const { userId, rating, comment } = req.body;

  if (!userId || !rating || !comment) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const reviewDoc = await Review.findOneAndUpdate(
      { userId },
      { $push: { reviews: { userId, rating, comment } } },
      { upsert: true, new: true }
    );
    res.status(201).json(reviewDoc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('userId', 'name') // populate top-level user
      .populate('reviews.userId', 'name'); // populate review authors

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Update a specific review by index
router.put('/:userId/:index', async (req, res) => {
  const { userId, index } = req.params;
  const { rating, comment } = req.body;

  try {
    const reviewDoc = await Review.findOne({ userId });
    if (!reviewDoc || !reviewDoc.reviews[index]) {
      return res.status(404).json({ error: 'Review not found' });
    }

    reviewDoc.reviews[index].rating = rating;
    reviewDoc.reviews[index].comment = comment;
    await reviewDoc.save();

    res.json(reviewDoc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a review
router.delete('/:userId/:index', async (req, res) => {
  const { userId, index } = req.params;

  try {
    const reviewDoc = await Review.findOne({ userId });
    if (!reviewDoc || index >= reviewDoc.reviews.length) {
      return res.status(404).json({ error: 'Review not found' });
    }

    reviewDoc.reviews.splice(index, 1);
    await reviewDoc.save();

    res.json({ message: 'Review deleted', review: reviewDoc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
