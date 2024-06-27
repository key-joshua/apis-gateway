import { Response } from 'express'
import { google } from 'googleapis'
import httpStatus from 'http-status'
import { googleOauth2Client, googleCalendar } from '../../../services/google'

const authGoogleCode = async (req: any, res: Response) => {
  try {
    
    const scopes = [ 'https://www.googleapis.com/auth/calendar' ]
    const authGoogleURL = googleOauth2Client.generateAuthUrl({ access_type: 'offline', scope: scopes })
    return res.redirect(authGoogleURL)
  } catch (error: unknown) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server error', error })
  }
}

const authCallbackGoogle = async (req: any, res: Response) => {
  try {
    const response = await googleOauth2Client.getToken(req.query.code)
    googleOauth2Client.setCredentials(response.res.data)

    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Success', data: { authGoogleCode: req.query.code, tokens: response.res.data } })
  } catch (error: unknown) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server error', error })
  }
}

const RefreshGoogleAccessToken = async (req: any, res: Response) => {
  try {
    googleOauth2Client.setCredentials({ refresh_token: req.query.refreshToken })
    const response = await googleOauth2Client.refreshAccessToken()
    googleOauth2Client.setCredentials(response.res.data)

    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Success', data: { tokens: response.res.data } })
  } catch (error: unknown) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server error', error })
  }
}

const scheduleGoogleEvent = async (req: any, res: Response) => {
  try {
    googleOauth2Client.setCredentials({ access_token: req?.headers?.authorization.replace('Bearer ', '') })
    const googleCalendar = await google.calendar({ version: 'v3', auth: googleOauth2Client })

    const event = {
      attendees: [ { email: 'aliceingabiremail@gmail.com' }, { email: 'josue.byiringiro.mail@gmail.com' } ],
      start: { dateTime: '2024-06-27T15:00:00',  timeZone: 'Africa/Johannesburg' },
      end: { dateTime: '2024-06-27T15:30:00', timeZone: 'Africa/Johannesburg' },
      description: 'This primary meeting is king of initial interview meeting',
      summary: 'Primary Meeting',
      conferenceData: {
        createRequest: {
          requestId: 'primary-meeting',
          conferenceSolutionKey: { 
            type: 'hangoutsMeet'
          }
        }
      }
    }
    
    const response = await googleCalendar.events.insert({ calendarId: 'primary', conferenceDataVersion: 1, requestBody: event })
    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Success', data: { event: response.data } })
  } catch (error: unknown) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server error', error })
  }
}

const getScheduledGoogleEvent = async (req: any, res: Response) => {
  try {
    googleOauth2Client.setCredentials({ access_token: req?.headers?.authorization.replace('Bearer ', '') })
    const googleCalendar = await google.calendar({ version: 'v3', auth: googleOauth2Client })

    const search = {  calendarId: 'primary', singleEvents: true, maxResults: 10, start: { dateTime: '2024-06-27T15:00:00',  timeZone: 'Africa/Johannesburg' }, end: { dateTime: '2024-06-27T15:30:00', timeZone: 'Africa/Johannesburg' } }
    const response = await googleCalendar.events.list(search)

    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Success', data: { events: response.data } })
  } catch (error: unknown) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server error', error })
  }
}

export default { authGoogleCode, authCallbackGoogle, RefreshGoogleAccessToken, scheduleGoogleEvent, getScheduledGoogleEvent }
