import { Router } from 'express'
import { userAuthorization } from '../middlewares/authorization'
import googleControllers from '../modules/google/controller/googleControllers'
import { isBodyValidation, isQueryValidation } from '../middlewares/validation'
import { refreshTokenSchema, codeSchema } from '../modules/calendly/validation/calendlyValidations'
import { postGoogleEventSchema, getGoogleCalendarSearchSchema } from '../modules/google/validation/googleValidations'


const router: Router = Router()

router.get('/auth-google-code', googleControllers.authGoogleCode)
router.get('/auth-google-callback', isQueryValidation(codeSchema), googleControllers.authCallbackGoogle)
router.get('/auth-refresh-google-access-token', isQueryValidation(refreshTokenSchema), googleControllers.RefreshGoogleAccessToken)

router.post('/post-google-event', userAuthorization, isBodyValidation(postGoogleEventSchema), googleControllers.PostGoogleEvent)
router.get('/get-scheduled-google-event', userAuthorization, isQueryValidation(getGoogleCalendarSearchSchema), googleControllers.getScheduledGoogleEvent)

export default router
