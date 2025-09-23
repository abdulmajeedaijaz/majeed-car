import 'dotenv/config';
import clientPromise from './src/lib/mongodb.js';

async function test() {
  const client = await clientPromise;
  
  // List all databases
  const adminDb = client.db().admin();
  const dbs = await adminDb.listDatabases();
  console.log('Databases:', dbs.databases.map(db => db.name));

  // List collections in users DB
  const db = client.db('users');
  const collections = await db.listCollections().toArray();
  console.log('Collections in users DB:', collections.map(c => c.name));

  // Fetch users
  const users = await db.collection('users').find({}).toArray();
  console.log('Users:', users);

  process.exit();
}

test();