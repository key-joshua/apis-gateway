import { Router } from 'express'
import { validation } from '../middlewares/validation'
import { userAuthorization } from '../middlewares/authorization'
import messageControllers from '../modules/message/controller/messageControllers'
import { emailMesageSchema, smsMesageSchema } from '../modules/message/validation/messageValidations'


const router: Router = Router()

router.post('/send-sms', userAuthorization, validation(smsMesageSchema), messageControllers.sendSMSs)
router.post('/send-email', userAuthorization, validation(emailMesageSchema), messageControllers.sendEmails)

export default router
