const mongoose = require('mongoose');

const CatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  categories: [
    {
      CatId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Cat' // Optional: if referencing a Category or Product model
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model('Category', CatSchema);
