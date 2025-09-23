import clientPromise from '../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const collectionName = 'users'; // make sure it matches your collection exactly
    const users = await db.collection(collectionName).find({}).toArray();

    // Map _id to id for frontend
    const formatted = users.map(user => ({
      id: user._id?.$oid || user._id?.toString(),
      name: user.name || "",
      email: user.email || "",
      role: user.role || "User",
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('MongoDB GET Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users: ' + error.message },
      { status: 500 }
    );
  }
}

// Example POST route (optional, for creating users)
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const collectionName = 'users';
    const newUser = await request.json();
    const result = await db.collection(collectionName).insertOne(newUser);

    return NextResponse.json({
      ...newUser,
      id: result.insertedId.toString(),
    });
  } catch (error) {
    console.error('MongoDB POST Error:', error);
    return NextResponse.json(
      { error: 'Failed to create user: ' + error.message },
      { status: 500 }
    );
  }
}