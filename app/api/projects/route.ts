import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import mongoose from 'mongoose';

// Define Project Schema
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  technologies: [{ type: String }],
  githubUrl: { type: String },
  liveUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

// GET all projects
export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find().sort('-createdAt');
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}

// POST new project
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const project = await Project.create(body);
    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}