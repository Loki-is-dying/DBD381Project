const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  reviews: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      rating: Number,
      comment: String
    }
  ]
});

module.exports = mongoose.model('Reviews', reviewSchema);
