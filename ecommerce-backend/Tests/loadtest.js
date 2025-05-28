const axios = require('axios');
const { faker } = require('@faker-js/faker');

const API_URL = 'http://localhost:5000/api/orders';

// Fake data
const userIds = [
  '6655f6f6f6f6f6f6f6f6f6f6',
  '6655f6f6f6f6f6f6f6f6f6f7',
];
const productIds = [
  '6655f6f6f6f6f6f6f6f6f6f8',
  '6655f6f6f6f6f6f6f6f6f6f9',
];

// Simulate one order
async function createOrder() {
  const userId = faker.helpers.arrayElement(userIds);
  const products = Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => ({
    productId: faker.helpers.arrayElement(productIds),
    quantity: faker.number.int({ min: 1, max: 5 }),
  }));

  const total = products.reduce((sum, p) => sum + p.quantity * 10, 0); // Assume price 10/unit

  try {
    const res = await axios.post(API_URL, {
      userId,
      products,
      total
    });
    console.log('Order created:', res.status);
  } catch (err) {
    console.error('Failed:', err.response?.status || err.message);
  }
}

// Run many in parallel
async function runLoadTest(concurrentRequests = 100) {
  const promises = [];
  for (let i = 0; i < concurrentRequests; i++) {
    promises.push(createOrder());
  }

  console.time('Load test duration');
  await Promise.all(promises);
  console.timeEnd('Load test duration');
}

runLoadTest(100); // Adjust concurrency
