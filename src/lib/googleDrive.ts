import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback';

export const createOAuth2Client = () => {
  return new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );
};

export const getAuthUrl = () => {
  const oauth2Client = createOAuth2Client();
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
    prompt: 'consent',
  });
};

export const getDriveService = (tokens: any) => {
  const oauth2Client = createOAuth2Client();
  oauth2Client.setCredentials(tokens);
  return google.drive({ version: 'v3', auth: oauth2Client });
};

export const getUserInfo = async (tokens: any) => {
  const oauth2Client = createOAuth2Client();
  oauth2Client.setCredentials(tokens);
  const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
  const res = await oauth2.userinfo.get();
  return res.data;
};

/**
 * Lists research files (PDF, Google Docs, DOCX, EPUB) from Google Drive.
 */
export const listLibraryFiles = async (tokens: any) => {
  const drive = getDriveService(tokens);
  
  const mimeTypes = [
    'application/pdf',
    'application/vnd.google-apps.document',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/epub+zip'
  ];
  
  const q = mimeTypes.map(m => `mimeType = '${m}'`).join(' or ') + ' and trashed = false';
  
  const response = await drive.files.list({
    q,
    fields: 'files(id, name, mimeType, thumbnailLink, webViewLink, iconLink, size, modifiedTime)',
    pageSize: 50,
    orderBy: 'modifiedTime desc',
  });

  return response.data.files || [];
};

/**
 * Saves a note to Google Drive.
 * If a file with the same name exists, it updates it.
 */
export const saveNoteToDrive = async (tokens: any, filename: string, content: string) => {
  const drive = getDriveService(tokens);
  
  // 1. Search for existing file
  const response = await drive.files.list({
    q: `name = '${filename}' and trashed = false`,
    fields: 'files(id, name)',
  });

  const files = response.data.files;
  
  if (files && files.length > 0) {
    // Update existing
    const fileId = files[0].id!;
    await drive.files.update({
      fileId: fileId,
      media: {
        mimeType: 'text/plain',
        body: content,
      },
    });
    return { id: fileId, action: 'updated' };
  } else {
    // Create new
    const fileMetadata = {
      name: filename,
      mimeType: 'text/plain',
    };
    const media = {
      mimeType: 'text/plain',
      body: content,
    };
    const res = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id',
    });
    return { id: res.data.id, action: 'created' };
  }
};
