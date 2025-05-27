import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';

export async function authenticate() {
  const keyFilePath = path.resolve('./google-service.json');

  if (process.env.GOOGLE_CREDENTIALS_BASE64) {
    const decoded = Buffer.from(process.env.GOOGLE_CREDENTIALS_BASE64, 'base64').toString('utf8');
    fs.writeFileSync(keyFilePath, decoded);
  }

  const scopes = ['https://www.googleapis.com/auth/drive.readonly'];

  const auth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes,
  });

  return auth.getClient();
}
