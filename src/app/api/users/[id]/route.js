import clientPromise from '../../../../lib/mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function PUT(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const { id } = params;

    const updatedUser = await request.json();
    delete updatedUser.id;

    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedUser }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('MongoDB PUT Error:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const { id } = params;

    const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('MongoDB DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}