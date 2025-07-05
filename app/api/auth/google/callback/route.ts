import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Endpoint used for google authentication
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  const refresh = searchParams.get('refresh');

  if (!token || !refresh) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const cookieStore = cookies();
  (await cookieStore).set('token', token, {
    httpOnly: true,
    secure: true,
    path: '/',
    expires: new Date(Date.now() + 86400000),
  });

  (await cookieStore).set('refresh', refresh, {
    httpOnly: true,
    secure: true,
    path: '/',
    expires: new Date(Date.now() + 86400000 * 7),
  });

  return NextResponse.redirect(new URL('/dashboard', req.url));
}