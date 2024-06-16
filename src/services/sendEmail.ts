import dotenv from 'dotenv'
import { Request, Response } from 'express'
import nodemailer, { SendMailOptions } from 'nodemailer'

dotenv.config()
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_HOST_PORT),
  secure: true,
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD
  }
})

const sendEmail = async(email: string, subject: string, message: string) => {
    try {
        const mailOptionsVerify: SendMailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: subject,
            text: message
        }
    
        await transporter.sendMail(mailOptionsVerify)
    } catch (error: any) {
        throw new Error(error)
    }
}


export {  sendEmail }