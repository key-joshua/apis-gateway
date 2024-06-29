import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'

export const googleOauth2Client: OAuth2Client = new google.auth.OAuth2( process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_CALL_BACK_AUTH_URL )
