// Script to check and reset MongoDB database connection
// Run with: node scripts/check-db.js

const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
const TARGET_DB = 'zyvex';

async function checkAndResetDb() {
  console.log('Checking MongoDB connection...');
  
  try {
    // Connect to MongoDB without specifying database
    const conn = await mongoose.connect(MONGODB_URI);
    
    // Get admin DB
    const adminDb = conn.connection.db.admin();
    
    // List all databases
    const dbInfo = await adminDb.listDatabases();
    console.log('\nAvailable databases:');
    dbInfo.databases.forEach(db => {
      console.log(`- ${db.name}${db.name === 'test' ? ' (default)' : ''}`);
    });
    
    // Check if our target DB exists
    const dbExists = dbInfo.databases.some(db => db.name === TARGET_DB);
    console.log(`\nTarget database '${TARGET_DB}' exists: ${dbExists}`);
    
    // Check the current database
    const currentDb = conn.connection.db.databaseName;
    console.log(`Current connected database: ${currentDb}`);
    
    // Switch to target database
    const targetConn = conn.connection.useDb(TARGET_DB);
    console.log(`Switched to database: ${targetConn.name}`);
    
    // Check if payments collection exists in target db
    const collections = await targetConn.listCollections().toArray();
    const paymentsExists = collections.some(coll => coll.name === 'payments');
    console.log(`Payments collection exists in ${TARGET_DB}: ${paymentsExists}`);
    
    if (paymentsExists) {
      // Count payments
      const Payment = targetConn.model('Payment', new mongoose.Schema({}, { collection: 'payments' }));
      const count = await Payment.countDocuments();
      console.log(`Number of payments in ${TARGET_DB}: ${count}`);
    }
    
    // If data is in test but not in zyvex, offer to migrate
    if (!paymentsExists) {
      const testDb = conn.connection.useDb('test');
      const testCollections = await testDb.listCollections().toArray();
      const testPaymentsExists = testCollections.some(coll => coll.name === 'payments');
      
      if (testPaymentsExists) {
        console.log('\nWARNING: Payments collection found in "test" database but not in "zyvex"!');
        console.log('You may need to migrate your data from "test" to "zyvex".');
        
        const TestPayment = testDb.model('TestPayment', new mongoose.Schema({}, { collection: 'payments' }));
        const testCount = await TestPayment.countDocuments();
        console.log(`Number of payments in test database: ${testCount}`);
        
        // Create example migration code
        console.log('\nTo migrate your data, you can run:');
        console.log(`
// Migration script example
const mongoose = require('mongoose');
mongoose.connect('${MONGODB_URI}');

async function migrateData() {
  const testDb = mongoose.connection.useDb('test');
  const zyvexDb = mongoose.connection.useDb('${TARGET_DB}');
  
  const testPayments = await testDb.collection('payments').find({}).toArray();
  console.log(\`Found \${testPayments.length} payments to migrate\`);
  
  if (testPayments.length > 0) {
    await zyvexDb.collection('payments').insertMany(testPayments);
    console.log('Migration completed successfully');
  }
}

migrateData()
  .then(() => console.log('Done'))
  .catch(console.error)
  .finally(() => mongoose.disconnect());
`);
      }
    }
    
    console.log('\nDatabase check completed.');
  } catch (error) {
    console.error('Error checking database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

checkAndResetDb().catch(console.error); 