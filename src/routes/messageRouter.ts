import { Router } from 'express'
import { isBodyValidation } from '../middlewares/validation'
import { userAuthorization } from '../middlewares/authorization'
import messageControllers from '../modules/message/controller/messageControllers'
import { emailMesageSchema, smsMesageSchema } from '../modules/message/validation/messageValidations'

const router: Router = Router()

router.post('/send-sms', userAuthorization, isBodyValidation(smsMesageSchema), messageControllers.sendSMSs)
router.post('/send-email', userAuthorization, isBodyValidation(emailMesageSchema), messageControllers.sendEmails)

export default router
