/**
 * This script specifically fixes the database issue where data is in 'test' instead of 'zyvex'
 * Run with: node scripts/fix-database.js
 */

const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
const TEST_DB = 'test';
const TARGET_DB = 'zyvex';

async function fixDatabase() {
  console.log(`Starting database fix process...`);
  console.log(`Connecting to MongoDB at ${MONGODB_URI}`);

  try {
    // First connect without specifying a database
    const conn = await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // 1. Check if we're currently using 'test' database
    const currentDb = mongoose.connection.db.databaseName;
    console.log(`\nCurrent database: ${currentDb}`);

    // 2. List all available databases
    const adminDb = conn.connection.db.admin();
    const dbInfo = await adminDb.listDatabases();
    console.log('\nAvailable databases:');
    dbInfo.databases.forEach(db => {
      console.log(`- ${db.name}${db.name === TEST_DB ? ' (default)' : ''}`);
    });

    // 3. Check if data exists in 'test'
    const testDb = conn.connection.useDb(TEST_DB);
    const testCollections = await testDb.listCollections().toArray();
    console.log(`\nCollections in '${TEST_DB}' database:`);
    let hasPayments = false;
    
    for (const coll of testCollections) {
      const count = await testDb.collection(coll.name).countDocuments();
      console.log(`- ${coll.name}: ${count} documents`);
      
      if (coll.name === 'payments') {
        hasPayments = true;
      }
    }

    // 4. Check if 'zyvex' database exists
    const zyvexExists = dbInfo.databases.some(db => db.name === TARGET_DB);
    console.log(`\nTarget database '${TARGET_DB}' exists: ${zyvexExists}`);

    // Create 'zyvex' database if it doesn't exist (by accessing it)
    const zyvexDb = conn.connection.useDb(TARGET_DB);
    
    // 5. Check collections in 'zyvex'
    const zyvexCollections = await zyvexDb.listCollections().toArray();
    console.log(`\nCollections in '${TARGET_DB}' database:`);
    let zyvexHasPayments = false;
    
    for (const coll of zyvexCollections) {
      const count = await zyvexDb.collection(coll.name).countDocuments();
      console.log(`- ${coll.name}: ${count} documents`);
      
      if (coll.name === 'payments') {
        zyvexHasPayments = true;
      }
    }

    // 6. Migrate payments if needed
    if (hasPayments && !zyvexHasPayments) {
      console.log(`\nPayments found in '${TEST_DB}' but not in '${TARGET_DB}'. Migrating...`);
      
      // Get all payments from 'test'
      const payments = await testDb.collection('payments').find({}).toArray();
      console.log(`Found ${payments.length} payments to migrate`);
      
      if (payments.length > 0) {
        // Insert into 'zyvex'
        const result = await zyvexDb.collection('payments').insertMany(payments);
        console.log(`Successfully migrated ${result.insertedCount} payments to '${TARGET_DB}'`);
      }
    } else if (hasPayments && zyvexHasPayments) {
      console.log(`\nPayments exist in both '${TEST_DB}' and '${TARGET_DB}'`);
    } else if (!hasPayments && !zyvexHasPayments) {
      console.log(`\nNo payments found in either database`);
    } else {
      console.log(`\nPayments only exist in '${TARGET_DB}', no migration needed`);
    }

    // 7. Test writing to 'zyvex'
    console.log(`\nTesting writing to '${TARGET_DB}' database...`);
    const testResult = await zyvexDb.collection('_dbtest').insertOne({
      test: true,
      timestamp: new Date()
    });
    console.log(`Test write successful: ${testResult.acknowledged}`);
    await zyvexDb.collection('_dbtest').deleteOne({ _id: testResult.insertedId });
    console.log(`Test cleanup successful`);

    console.log(`\nDatabase fix process completed successfully!`);
    console.log(`\nNote: Your application should now use the '${TARGET_DB}' database. If not, check your connection settings.`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

fixDatabase().catch(console.error); 