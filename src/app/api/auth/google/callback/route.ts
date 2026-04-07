import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getUserInfo } from '@/lib/googleDrive';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  
  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    const userInfo = await getUserInfo(tokens);
    
    // Retrieve existing accounts
    const accountsCookie = req.cookies.get('google_drive_accounts');
    let accounts = [];
    if (accountsCookie) {
        try {
            accounts = JSON.parse(accountsCookie.value);
        } catch (e) {
            accounts = [];
        }
    }

    // Add or update account
    const newAccount = {
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
        tokens,
    };

    const existingIndex = accounts.findIndex((a: any) => a.email === userInfo.email);
    if (existingIndex > -1) {
        accounts[existingIndex] = newAccount;
    } else {
        accounts.push(newAccount);
    }
    
    const response = NextResponse.redirect(new URL('/', req.url));
    response.cookies.set('google_drive_accounts', JSON.stringify(accounts), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 3600 * 24 * 7, // 1 week
    });
    
    return response;
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
