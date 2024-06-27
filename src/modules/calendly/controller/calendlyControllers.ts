import axios from 'axios'
import { Response } from 'express'
import httpStatus from 'http-status'
import { URLSearchParams } from 'url'
import { OauthAuthorization, OauthToken, geCalendlyProfileAPI, createCalendlyOneOffEventTypeAPI, createCalendlyEventShareAPI, getCalendlyEventyTypesAPI, getCalendlyScheduledEventsAPI } from '../../../utils/calendly'

const authCalendlyCode = async (req: any, res: Response) => {
  try {
    const authCalendlyURL = `${OauthAuthorization}?client_id=${process.env.CALENDLY_CLIENT_ID}&redirect_uri=${process.env.CALENDLY_CALL_BACK_AUTH_URL}&response_type=code`
    return res.redirect(authCalendlyURL)
  } catch (error: unknown) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server error', error })
  }
}

const authCallbackCalendly = async (req: any, res: Response) => {
  try {
    const authCalendlyCode = req.query.code
    const configs = {
      grant_type: 'authorization_code',
      code: authCalendlyCode,
      client_id: process.env.CALENDLY_CLIENT_ID,
      client_secret: process.env.CALENDLY_CLIENT_SECRET,
      redirect_uri: process.env.CALENDLY_CALL_BACK_AUTH_URL,
    }

    const response = await axios.post(`${OauthToken}`, configs, { headers: { 'Content-Type': 'application/x-www-form-urlencoded'} })
    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Success', data: { authCalendlyCode, tokens: response?.data } })
  } catch (error: unknown) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server error', error })
  }
}

const RefreshCalendlyAccessToken = async (req: any, res: Response) => {
  try {
    const configs = {
      grant_type: 'refresh_token',
      refresh_token: req.query.refreshToken,
      client_id: process.env.CALENDLY_CLIENT_ID,
      client_secret: process.env.CALENDLY_CLIENT_SECRET,
      redirect_uri: process.env.CALENDLY_CALL_BACK_AUTH_URL,
    }

    const response = await axios.post(`${OauthToken}`, configs, { headers: { 'Content-Type': 'application/x-www-form-urlencoded'} })
    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Success', data: { token: response?.data } })
  } catch (error: unknown) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server error', error })
  }
}

const geCalendlyProfile = async (req: any, res: Response) => {
  try {
    const response = await axios.get(`${geCalendlyProfileAPI}`, { headers: { Authorization: req?.headers?.authorization, 'Content-Type': 'application/json', 'Accept': 'application/json' } })
    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Success.', data: { user: response?.data } })
  } catch (error: unknown) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server error', error })
  }
}

const createCalendlyOneOffEventType = async (req: any, res: Response) => {
  try {
    const configs = {
      headers: {
        'Authorization': req?.headers?.authorization,
        'Content-Type': 'application/json'
      }
    }
    
    const response = await axios.post(createCalendlyOneOffEventTypeAPI, req.body, configs)
    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Success.', data: { event: response?.data } })
  } catch (error: unknown) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server error', error })
  }
}

const createCalendlyEventShare = async (req: any, res: Response) => {
  try {
    const configs = {
      headers: {
        'Authorization': req?.headers?.authorization,
        'Content-Type': 'application/json'
      }
    }
    
    const response = await axios.post(createCalendlyEventShareAPI, req.body, configs)
    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Success.', data: { event: response?.data } })
  } catch (error: unknown) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server error', error })
  }
}

const getCalendlyEventyTypes = async (req: any, res: Response) => {
  try {
    const configs = {
      headers: {
        'Authorization': req?.headers?.authorization,
        'Content-Type': 'application/json'
      }
    } 

    const queryParamsString = new URLSearchParams(req.query).toString()
    const response = await axios.get(`${getCalendlyEventyTypesAPI}?${queryParamsString}`, configs)
    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Success.', data: { events: response.data } })
  } catch (error: unknown) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server error', error })
  }
}

const getCalendlyEventyType = async (req: any, res: Response) => {
  try {
    const configs = {
      headers: {
        'Authorization': req?.headers?.authorization,
        'Content-Type': 'application/json'
      }
    } 

    const response = await axios.get(`${getCalendlyEventyTypesAPI}/${req.params.eventId}`, configs)
    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Success.', data: { events: response.data } })
  } catch (error: unknown) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server error', error })
  }
}

const getCalendlyScheduledEvents = async (req: any, res: Response) => {
  try {
    const configs = {
      headers: {
        'Authorization': req?.headers?.authorization,
        'Content-Type': 'application/json'
      }
    }

    const queryParamsString = new URLSearchParams(req.query).toString()
    const response = await axios.get(`${getCalendlyScheduledEventsAPI}?${queryParamsString}`, configs)
    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Success.', data: { events: response.data } })
  } catch (error: unknown) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server error', error })
  }
}

export default { authCalendlyCode, authCallbackCalendly, RefreshCalendlyAccessToken, geCalendlyProfile, createCalendlyOneOffEventType, createCalendlyEventShare, getCalendlyEventyTypes, getCalendlyEventyType, getCalendlyScheduledEvents }
