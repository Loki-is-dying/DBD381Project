const axios = require('axios');
const { faker } = require('@faker-js/faker');

const API_URL = 'http://localhost:5000/api/orders';

// Fake static IDs
const userIds = [
  '6655f6f6f6f6f6f6f6f6f6f6',
  '6655f6f6f6f6f6f6f6f6f6f7',
];
const productIds = [
  '6655f6f6f6f6f6f6f6f6f6f8',
  '6655f6f6f6f6f6f6f6f6f6f9',
];

// Create a single fake order
async function createOrder() {
  const userId = faker.helpers.arrayElement(userIds);
  const products = Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => ({
    productId: faker.helpers.arrayElement(productIds),
    quantity: faker.number.int({ min: 1, max: 5 }),
  }));
  const total = products.reduce((sum, p) => sum + p.quantity * 10, 0); // Simulated total

  try {
    const res = await axios.post(API_URL, {
      userId,
      products,
      total
    });
    return { success: true };
  } catch (err) {
    return { success: false, status: err.response?.status || 'NO_RESPONSE' };
  }
}

// Run stress test by increasing concurrency step-by-step
async function runStressTest() {
  const steps = [10, 50, 100, 200, 500];
  for (const concurrentRequests of steps) {
    console.log(`\n Testing with ${concurrentRequests} concurrent requests...`);

    const start = Date.now();
    const promises = Array.from({ length: concurrentRequests }, () => createOrder());
    const results = await Promise.all(promises);
    const duration = Date.now() - start;

    const successCount = results.filter(r => r.success).length;
    const failCount = results.length - successCount;

    console.log(`Success: ${successCount}`);
    console.log(`Failed: ${failCount}`);
    console.log(`Duration: ${duration} ms`);
  }

  console.log('\nStress test complete.');
}

runStressTest();
