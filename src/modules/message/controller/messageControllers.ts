import { Response } from 'express'
import httpStatus from 'http-status'
import { sendEmail } from '../../../services/sendEmail'

const sendEmails = async (req: any, res: Response) => {
  try {
    await sendEmail(req.body.email, 'Hello Dear', req.body.message)
    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Email sent successfully.' })
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error.message })
  }
}

export default { sendEmails }