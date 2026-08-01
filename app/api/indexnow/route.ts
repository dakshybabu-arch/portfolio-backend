import { NextRequest, NextResponse } from 'next/server';

const INDEXNOW_ENDPOINT = 'https://www.indexnow.org/indexnow';
const API_KEY = 'dff1c41e4b4a4b79963a84f4d4302fbb';
const HOST = 'your-protfolio-daksh.vercel.app';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        host: HOST,
        key: API_KEY,
        urlList: [url],
      }),
    });

    if (!response.ok) {
      throw new Error(`IndexNow API error: ${response.statusText}`);
    }

    return NextResponse.json({ success: true, message: 'URL submitted to IndexNow' });
  } catch (error) {
    console.error('IndexNow submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit URL to IndexNow' },
      { status: 500 }
    );
  }
}
