import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const accountsCookie = req.cookies.get('google_drive_accounts');
  
  if (!accountsCookie) {
    return NextResponse.json({ accounts: [] });
  }

  try {
    const accounts = JSON.parse(accountsCookie.value);
    // Remove tokens before sending to client
    const sanitizedAccounts = accounts.map((acc: any) => ({
      email: acc.email,
      name: acc.name,
      picture: acc.picture,
    }));
    return NextResponse.json({ accounts: sanitizedAccounts });
  } catch (e) {
    return NextResponse.json({ accounts: [] });
  }
}
