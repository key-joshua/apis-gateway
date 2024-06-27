import { Router } from 'express'
import { isQueryValidation } from '../middlewares/validation'
import { userAuthorization } from '../middlewares/authorization'
import googleControllers from '../modules/google/controller/googleControllers'
import { refreshTokenSchema, codeSchema } from '../modules/calendly/validation/calendlyValidations'

const router: Router = Router()

router.get('/auth-google-code', googleControllers.authGoogleCode)
router.get('/auth-google-callback', isQueryValidation(codeSchema), googleControllers.authCallbackGoogle)
router.get('/auth-refresh-google-access-token', isQueryValidation(refreshTokenSchema), googleControllers.RefreshGoogleAccessToken)

router.post('/schedule-google-event', userAuthorization, googleControllers.scheduleGoogleEvent)
router.get('/get-scheduled-google-event', userAuthorization, googleControllers.getScheduledGoogleEvent)


export default router
