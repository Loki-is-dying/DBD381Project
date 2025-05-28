//Used to just delete tested info (stress test, load test etc)
require('dotenv').config({ path: '../.env' });
console.log('Mongo URI:', process.env.MONGODB_URI);
const mongoose = require('mongoose');
const Order = require('../models/Order'); // Adjust path if needed


const mongoURI = process.env.MONGODB_URI

async function deleteAllOrders() {
  try {
    await mongoose.connect(mongoURI);
    const result = await Order.deleteMany({});
    console.log(`Deleted ${result.deletedCount} orders`);
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

deleteAllOrders();
