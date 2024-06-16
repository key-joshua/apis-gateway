import express, { Express, Request, Response } from 'express'
import httpStatus from 'http-status'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes'

dotenv.config()
const app: Express = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

app.use('/api', router)
app.get('**', (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({ status: true, message: 'WELCOME TO APIs GATEWAY SERVER.' })
})

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})

export default app