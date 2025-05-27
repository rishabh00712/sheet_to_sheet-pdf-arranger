import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';

export async function authenticate() {
  const keyFilePath = path.join(process.cwd(), 'service-account.json');

  if (process.env.GOOGLE_CREDENTIALS_BASE64) {
    const decoded = Buffer.from(process.env.GOOGLE_CREDENTIALS_BASE64, 'base64').toString('utf8');
    JSON.parse(decoded); // validates
    fs.writeFileSync(keyFilePath, decoded);
    console.log("✅ google-service.json written to:", keyFilePath);
  }

  if (!fs.existsSync(keyFilePath)) {
    throw new Error(`❌ service-account.json not found at ${keyFilePath}`);
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  return auth.getClient();
}
