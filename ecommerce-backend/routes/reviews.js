const express = require('express');
const router = express.Router();
const Review = require('../models/Reviews');

// Add a review
router.post('/', async (req, res) => {
  try {
    const { userId, rating, comment } = req.body;
    const review = await Review.findOneAndUpdate(
      { userId },
      {
        $push: {
          reviews: { userId, rating, comment }
        }
      },
      { upsert: true, new: true }
    );
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// View all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a review by userId and index
router.put('/:userId/:index', async (req, res) => {
  try {
    const { userId, index } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findOne({ userId });
    if (!review) return res.status(404).json({ error: 'Review not found' });

    if (index >= review.reviews.length) {
      return res.status(400).json({ error: 'Invalid review index' });
    }

    review.reviews[index].rating = rating;
    review.reviews[index].comment = comment;
    await review.save();

    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a review by userId and index
router.delete('/:userId/:index', async (req, res) => {
  try {
    const { userId, index } = req.params;

    const review = await Review.findOne({ userId });
    if (!review) return res.status(404).json({ error: 'Review not found' });

    review.reviews.splice(index, 1);
    await review.save();

    res.json({ message: 'Review deleted', review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
