import { NextRequest, NextResponse } from 'next/server';
import { fetchZoteroItems } from '@/lib/zotero';

export async function GET(req: NextRequest) {
  const userId = process.env.ZOTERO_USER_ID;
  const apiKey = process.env.ZOTERO_API_KEY;

  if (!userId || !apiKey) {
    return NextResponse.json({ error: 'Zotero credentials not configured' }, { status: 400 });
  }

  try {
    const items = await fetchZoteroItems(userId, apiKey);
    return NextResponse.json({ items });
  } catch (error: any) {
    console.error('Zotero fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
