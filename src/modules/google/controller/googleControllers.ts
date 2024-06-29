import { Response } from 'express'
import { google } from 'googleapis'
import httpStatus from 'http-status'
import { googleOauth2Client } from '../../../services/google'

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

const PostGoogleEvent = async (req: any, res: Response) => {
  try {
    googleOauth2Client.setCredentials({ access_token: req?.headers?.authorization.replace('Bearer ', '') })
    const googleCalendar = await google.calendar({ version: 'v3', auth: googleOauth2Client })

    const response = await googleCalendar.events.insert({ calendarId: 'primary', conferenceDataVersion: 1, requestBody:  req.body })
    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Success', data: { event: response.data } })
  } catch (error: unknown) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server error', error })
  }
}

const getScheduledGoogleEvent = async (req: any, res: Response) => {
  try {
    googleOauth2Client.setCredentials({ access_token: req?.headers?.authorization.replace('Bearer ', '') })
    const googleCalendar = await google.calendar({ version: 'v3', auth: googleOauth2Client })

    req.query.timeMin = new Date(req.query?.timeMin).toISOString()
    req.query.timeMax = new Date(req.query?.timeMax).toISOString()

    const response = await googleCalendar.events.list(req.query)
    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Success', data: { events: response.data } })
  } catch (error: unknown) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server error', error })
  }
}

export default { authGoogleCode, authCallbackGoogle, RefreshGoogleAccessToken, PostGoogleEvent, getScheduledGoogleEvent }
