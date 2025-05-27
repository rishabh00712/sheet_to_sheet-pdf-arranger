// utils/googleAuth.js
import { google } from 'googleapis';

export async function authenticate() {
  const keyFile = './service-account.json'; // path to your JSON key
  const scopes = ['https://www.googleapis.com/auth/drive'];

  const auth = new google.auth.GoogleAuth({
    keyFile,
    scopes,
  });

  return auth.getClient();
}
