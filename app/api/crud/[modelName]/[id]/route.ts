import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import mongoose from 'mongoose';

// Dynamic model creation for flexible CRUD operations
function createModel(modelName: string, schema: mongoose.Schema) {
  // Check if model already exists to prevent overwrite errors
  if (mongoose.models[modelName]) {
    return mongoose.models[modelName];
  }
  return mongoose.model(modelName, schema);
}

// GET single document by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ modelName: string; id: string }> }
) {
  try {
    await connectDB();
    const { modelName, id } = await params;
    
    const schema = new mongoose.Schema({});
    const Model = createModel(modelName, schema);
    
    const document = await (Model as any).findById(id);
    
    if (!document) {
      return NextResponse.json({ success: false, error: 'Document not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: document });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}

// PUT update document
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ modelName: string; id: string }> }
) {
  try {
    await connectDB();
    const { modelName, id } = await params;
    const body = await request.json();
    
    const schema = new mongoose.Schema({});
    const Model = createModel(modelName, schema);
    
    const document = await (Model as any).findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!document) {
      return NextResponse.json({ success: false, error: 'Document not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: document });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}

// DELETE document
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ modelName: string; id: string }> }
) {
  try {
    await connectDB();
    const { modelName, id } = await params;
    
    const schema = new mongoose.Schema({});
    const Model = createModel(modelName, schema);
    
    const document = await (Model as any).findByIdAndDelete(id);

    if (!document) {
      return NextResponse.json({ success: false, error: 'Document not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: {}, message: 'Document deleted successfully' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}