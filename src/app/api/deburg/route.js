// src/app/api/debug/route.js
import clientPromise from '../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    
const users = await db.collection('Users').find({}).toArray();
    
    // Return raw data to see the actual structure
    return NextResponse.json({
      message: 'Raw user data structure',
      users: users,
      firstUserFields: users.length > 0 ? Object.keys(users[0]) : []
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}