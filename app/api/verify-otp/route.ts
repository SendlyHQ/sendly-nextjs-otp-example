import { NextRequest, NextResponse } from 'next/server';
import Sendly from '@sendly/node';

const sendly = new Sendly(process.env.SENDLY_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { id, code } = await request.json();

    if (!id || !code) {
      return NextResponse.json(
        { error: 'Verification ID and code are required' },
        { status: 400 }
      );
    }

    if (!process.env.SENDLY_API_KEY) {
      return NextResponse.json(
        { error: 'SENDLY_API_KEY is not configured' },
        { status: 500 }
      );
    }

    const result = await sendly.verify.check(id, {
      code,
    });

    if (result.status === 'verified') {
      return NextResponse.json({
        success: true,
        status: result.status,
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid or expired code' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Verification failed' },
      { status: 500 }
    );
  }
}
