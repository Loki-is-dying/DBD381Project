const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  products: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      quantity: Number
    }
  ],
  status: { type: String, default: 'Pending' },
  total: Number,
});
module.exports = mongoose.model('Order', OrderSchema);
