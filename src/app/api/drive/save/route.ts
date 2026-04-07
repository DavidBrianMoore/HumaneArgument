import { NextRequest, NextResponse } from 'next/server';
import { saveNoteToDrive } from '@/lib/googleDrive';

export async function POST(req: NextRequest) {
  try {
    const { filename, content, email } = await req.json();
    const accountsCookie = req.cookies.get('google_drive_accounts');
    
    if (!accountsCookie) {
      return NextResponse.json({ error: 'Not authenticated with Google' }, { status: 401 });
    }

    const accounts = JSON.parse(accountsCookie.value);
    const account = accounts.find((a: any) => a.email === email) || accounts[0]; // fallback to first
    
    if (!account) {
        return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    const result = await saveNoteToDrive(account.tokens, filename, content);
    
    return NextResponse.json({ success: true, ...result, email: account.email });
  } catch (error: any) {
    console.error('Drive save error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
