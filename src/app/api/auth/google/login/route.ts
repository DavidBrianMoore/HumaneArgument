import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

export async function GET() {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline', // to receive refresh tokens
    scope: [
      'https://www.googleapis.com/auth/drive.file', // access to files created by this app
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
    prompt: 'consent', // ensures we always get a refresh token
  });
  
  return NextResponse.redirect(authUrl);
}
