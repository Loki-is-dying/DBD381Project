const axios = require('axios');

const API_URL = 'http://localhost:5000/api/orders';

// Simulate one GET request
async function getOrders() {
  try {
    const res = await axios.get(API_URL);
    console.log(`Status: ${res.status} - Received ${res.data.length || 'some'} orders`);
  } catch (err) {
    console.error('Failed:', err.response?.status || err.message);
  }
}

// Run many GET requests in parallel
async function runReadStressTest(concurrentRequests = 100) {
  const promises = [];
  for (let i = 0; i < concurrentRequests; i++) {
    promises.push(getOrders());
  }

  console.time('Read stress test duration');
  await Promise.all(promises);
  console.timeEnd('Read stress test duration');
}

runReadStressTest(1000); // You can increase this number to increase stress
