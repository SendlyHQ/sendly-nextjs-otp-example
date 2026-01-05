import { NextRequest, NextResponse } from 'next/server';
import Sendly from '@sendly/node';

const sendly = new Sendly(process.env.SENDLY_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    if (!process.env.SENDLY_API_KEY) {
      return NextResponse.json(
        { error: 'SENDLY_API_KEY is not configured' },
        { status: 500 }
      );
    }

    const verification = await sendly.verify.send({
      to: phone,
    });

    return NextResponse.json({
      verificationId: verification.id,
      status: verification.status,
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send OTP' },
      { status: 500 }
    );
  }
}
