const axios = require('axios');

const ORDER_ID = '6834534045f1268d805dc0fd';  // Replace with a real order _id in your DB
const API_URL = `http://localhost:5000/api/orders/${ORDER_ID}`;

async function updateOrderStatus(status) {
  try {
    const res = await axios.put(API_URL, { status });
    console.log(`Updated status to "${status}":`, res.status);
  } catch (err) {
    console.error('Update failed:', err.response?.status || err.message);
  }
}

async function runUpdateStressTest(concurrentRequests = 50) {
  const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const promises = [];
  for (let i = 0; i < concurrentRequests; i++) {
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    promises.push(updateOrderStatus(randomStatus));
  }

  console.time('Update stress test duration');
  await Promise.all(promises);
  console.timeEnd('Update stress test duration');
}

runUpdateStressTest(200);
