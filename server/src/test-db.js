import { connectDB, UserModel, ItemModel } from './config/db.js';

async function runSmokeTest() {
  console.log('[Test] Testing DB connection and seeding...');
  await connectDB();

  // Test UserModel
  const admin = await UserModel.findByEmail('admin@example.com');
  if (!admin) {
    throw new Error('Smoke test failed: admin@example.com not found');
  }
  console.log('[Test] Admin user verified:', admin.email);

  // Test ItemModel
  const items = await ItemModel.findAll();
  if (items.length === 0) {
    throw new Error('Smoke test failed: items collection is empty');
  }
  console.log(`[Test] ItemModel verified: ${items.length} seeded items loaded`);

  console.log('[Test] All smoke tests passed successfully!');
}

runSmokeTest().catch((err) => {
  console.error('[Test Failed]:', err);
  process.exit(1);
});
