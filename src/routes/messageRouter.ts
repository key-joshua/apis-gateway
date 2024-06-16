import { Router } from 'express'
import { validation } from '../middlewares/validation'
import { userAuthorization } from '../middlewares/authorization'
import { messageSchema } from '../modules/message/validation/messageValidations'
import messageControllers from '../modules/message/controller/messageControllers'


const router: Router = Router()

router.post('/send-email', userAuthorization, validation(messageSchema), messageControllers.sendEmails)

export default router
