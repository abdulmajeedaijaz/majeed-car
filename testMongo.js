// testMongo.js
import 'dotenv/config'; // loads .env.local
import clientPromise from "./src/lib/mongodb.js"; // include .js

async function runTest() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "users");
    const users = await db.collection("users").find({}).toArray();
    console.log("Users:", users);
  } catch (err) {
    console.error("MongoDB test error:", err);
  } finally {
    process.exit();
  }
}

runTest();