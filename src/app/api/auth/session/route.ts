
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { action } = await request.json();

  if (action === 'login') {
    // Set a session cookie for admin access. 
    // In a production app, this would involve verifying a Firebase ID token.
    cookies().set('admin-session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    return NextResponse.json({ success: true });
  }

  if (action === 'logout') {
    cookies().delete('admin-session');
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}
