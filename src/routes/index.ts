import { Router } from 'express'
import authRouter from './authRouter'
import messageRouter from './messageRouter'

const router: Router = Router()
router.use('/auth', authRouter)
router.use('/message', messageRouter)

export default router
