import 'dotenv/config'; // load .env variables
import clientPromise from './src/lib/mongodb.js';

async function moveUsers() {
  try {
    const client = await clientPromise;

    const sourceDB = client.db('test');        // current database
    const targetDB = client.db('users');       // target database

    const users = await sourceDB.collection('users').find({}).toArray();

    if (users.length === 0) {
      console.log('No users found in test.users');
    } else {
      await targetDB.collection('users').insertMany(users);
      console.log(`Moved ${users.length} users to users.users`);
    }

    // Optional: delete old data from test.users
    // await sourceDB.collection('users').deleteMany({});
    // console.log('Old users deleted from test.users');

  } catch (err) {
    console.error('Error moving users:', err);
  } finally {
    process.exit();
  }
}

moveUsers();