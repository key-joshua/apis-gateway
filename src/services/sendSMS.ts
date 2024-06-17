import { Twilio } from 'twilio'


const authToken=process.env.TWILIO_AUTH_TOKEN
const accountSid=process.env.TWILIO_ACCOUNT_SID
const client = new Twilio(accountSid, authToken)

const sendSMS = async(receiver: string, message: string) => {
    try {
        await client.messages
        .create({ from: process.env.TWILIO_PHONE_NUMBER, to: receiver, body: message })
        .then((message: any) =>  message)
        .catch((error: any) => error)
    } catch (error: any) {
        throw new Error(error)
    }
}

export {  sendSMS }
