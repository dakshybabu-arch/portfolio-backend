import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import mongoose from 'mongoose';
import { sendEmail } from '@/server/config/email';

export const runtime = 'nodejs';

const recipient = 'dakshybabu@gmail.com';

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] as string);
}

// Define Contact Schema
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

// GET all contacts
export async function GET() {
  try {
    await connectDB();
    const contacts = await Contact.find().sort('-createdAt');
    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}

// POST new contact
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a name, valid email address, and message.' },
        { status: 400 },
      );
    }

    if (name.length > 120 || email.length > 254 || message.length > 5000) {
      return NextResponse.json(
        { success: false, error: 'Your message is too long.' },
        { status: 400 },
      );
    }

    await sendEmail({
      to: recipient,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New portfolio contact</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      `,
    });

    let contact = null;
    try {
      await connectDB();
      contact = await Contact.create({ name, email, message });
    } catch (databaseError) {
      // Email delivery is the primary action; a database outage should not ask
      // visitors to retry and accidentally send the same message twice.
      console.error('Contact email sent, but the submission was not saved:', databaseError);
    }

    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch (error) {
    console.error('Contact form submission failed:', error);
    return NextResponse.json(
      { success: false, error: 'Unable to send your message. Please try again later.' },
      { status: 500 },
    );
  }
}
