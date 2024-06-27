import { Router } from 'express'
import authRouter from './authRouter'
import googleRouter from './googleRouter'
import messageRouter from './messageRouter'
import calendlyRouter from './calendlyRouter'

const router: Router = Router()
router.use('/auth', authRouter)
router.use('/google', googleRouter)
router.use('/message', messageRouter)
router.use('/calendly', calendlyRouter)

export default router
