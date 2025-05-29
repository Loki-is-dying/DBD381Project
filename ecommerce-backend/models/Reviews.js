const mongoose = require('mongoose');

const individualReviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'  // reference User model
  },
  rating: Number,
  comment: String,
});

const reviewGroupSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [individualReviewSchema],
});

module.exports = mongoose.model('Reviews', reviewGroupSchema);
