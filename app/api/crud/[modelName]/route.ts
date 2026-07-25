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

// GET all documents with pagination and filtering
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ modelName: string }> }
) {
  try {
    await connectDB();
    const { modelName } = await params;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sort = searchParams.get('sort') || '-createdAt';
    
    // Build filters from query params
    const filters: any = {};
    searchParams.forEach((value, key) => {
      if (!['page', 'limit', 'sort'].includes(key)) {
        filters[key] = value;
      }
    });
    
    const schema = new mongoose.Schema({});
    const Model = createModel(modelName, schema);
    
    const documents = await (Model as any)
      .find(filters)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await (Model as any).countDocuments(filters);

    return NextResponse.json({
      success: true,
      data: documents,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}

// POST new document
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ modelName: string }> }
) {
  try {
    await connectDB();
    const { modelName } = await params;
    const body = await request.json();
    
    // Build schema from request data
    const schemaDefinition: any = {};
    for (const key in body) {
      const value = body[key];
      if (typeof value === 'string') {
        schemaDefinition[key] = String;
      } else if (typeof value === 'number') {
        schemaDefinition[key] = Number;
      } else if (typeof value === 'boolean') {
        schemaDefinition[key] = Boolean;
      } else if (Array.isArray(value)) {
        schemaDefinition[key] = Array;
      } else if (typeof value === 'object') {
        schemaDefinition[key] = mongoose.Schema.Types.Mixed;
      }
    }
    
    const schema = new mongoose.Schema(schemaDefinition);
    const Model = createModel(modelName, schema);
    
    const document = await (Model as any).create(body);
    return NextResponse.json({ success: true, data: document }, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}