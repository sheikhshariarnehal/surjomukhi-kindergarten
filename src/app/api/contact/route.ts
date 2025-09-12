import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject is too long'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long'),
});

// POST /api/contact - Submit contact form
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request data
    const validation = contactFormSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Invalid input', 
          details: validation.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message } = validation.data;

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification to admin
    // 3. Send confirmation email to user
    
    // For now, we'll just log the contact form submission
    console.log('Contact form submission:', {
      name,
      email,
      phone,
      subject,
      message,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    });

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real implementation, you might want to:
    // - Store in a contacts/messages table
    // - Send email using a service like SendGrid, Nodemailer, etc.
    // - Add rate limiting to prevent spam
    // - Add CAPTCHA verification

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
    }, { status: 200 });

  } catch (error) {
    console.error('Contact form API error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
