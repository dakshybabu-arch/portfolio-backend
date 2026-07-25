import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import mongoose from 'mongoose';

// Define User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

// GET all users (without passwords)
export async function GET() {
  try {
    await connectDB();
    const users = await User.find().select('-password');
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}

// POST new user
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const user = await User.create(body);
    
    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;
    
    return NextResponse.json({ success: true, data: userResponse }, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}