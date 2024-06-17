import { Twilio } from 'twilio'


const authToken=process.env.AUTH_TOKEN
const accountSid=process.env.ACCOUNT_SID
const client = new Twilio(accountSid, authToken)

const sendSMS = async(receiver: string, message: string) => {
    try {
        await client.messages
        .create({ from: process.env.PHONE_NUMBER, to: receiver, body: message })
        .then((message) =>  message)
        .catch((error) => error)
    } catch (error: any) {
        throw new Error(error)
    }
}

export {  sendSMS }
