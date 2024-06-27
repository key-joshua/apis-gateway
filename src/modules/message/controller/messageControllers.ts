import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { sendSMS } from '../../../services/sendSMS'
import { sendEmail } from '../../../services/sendEmail'

const sendEmails = async (req: any, res: Response) => {
  try {
    await sendEmail(req.body.email, 'Hello Dear', req.body.message)
    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Email sent successfully.' })
  } catch (error: unknown) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server error', error })
  }
}

const sendSMSs = async (req: Request, res: Response) => {
  try {
    await sendSMS(req.body.phone, req.body.message)
    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'SMS sent successfully.' })
  } catch (error: unknown) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server error', error })
  }
}

export default { sendEmails, sendSMSs }