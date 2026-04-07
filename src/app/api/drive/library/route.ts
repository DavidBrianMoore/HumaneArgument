import { NextRequest, NextResponse } from 'next/server';
import { listLibraryFiles } from '@/lib/googleDrive';

export async function GET(req: NextRequest) {
  try {
    const accountsCookie = req.cookies.get('google_drive_accounts');
    if (!accountsCookie) {
      return NextResponse.json({ files: [] });
    }

    const accounts = JSON.parse(accountsCookie.value);
    
    // Aggregating files from all connected accounts
    const allFilesPromises = accounts.map((acc: any) => 
      listLibraryFiles(acc.tokens).then(files => files.map(f => ({ ...f, accountEmail: acc.email })))
    );

    const filesArray = await Promise.all(allFilesPromises);
    const flattenedFiles = filesArray.flat();
    
    // Sort by modifiedTime descending
    flattenedFiles.sort((a, b) => 
      new Date(b.modifiedTime).getTime() - new Date(a.modifiedTime).getTime()
    );

    return NextResponse.json({ files: flattenedFiles });
  } catch (error: any) {
    console.error('Library fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
