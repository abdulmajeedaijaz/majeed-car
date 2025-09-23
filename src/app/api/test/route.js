// testMongo.js
import clientPromise from "./lib/mongodb.js";

async function test() {
  try {
    const client = await clientPromise;
    const db = client.db("users");
    const users = await db.collection("users").find({}).toArray();
    console.log("Users:", users);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

test();