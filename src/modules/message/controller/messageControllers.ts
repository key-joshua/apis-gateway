import { Response } from 'express'
import httpStatus from 'http-status'
import { sendSMS } from '../../../services/sendSMS'
import { sendEmail } from '../../../services/sendEmail'

const sendEmails = async (req: any, res: Response) => {
  try {
    await sendEmail(req.body.email, 'Hello Dear', req.body.message)
    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Email sent successfully.' })
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error.message })
  }
}

const sendSMSs = async (req: any, res: Response) => {
  try {
    await sendSMS(req.body.phone, req.body.message)
    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'SMS sent successfully.' })
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error.message })
  }
}

export default { sendEmails, sendSMSs }