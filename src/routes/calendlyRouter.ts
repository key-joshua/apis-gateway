import { Router } from 'express'
import { userAuthorization } from '../middlewares/authorization'
import calendlyControllers from '../modules/calendly/controller/calendlyControllers'
import { isBodyValidation, isQueryValidation, isParamValidation } from '../middlewares/validation'
import { refreshTokenSchema, codeSchema,  getEventsTypesSchema, getScheduledEventsSchema, getEventSchema, createOneOffEventsSchema, createEventShareSchema } from '../modules/calendly/validation/calendlyValidations'

const router: Router = Router()

router.get('/auth-calendly-code', calendlyControllers.authCalendlyCode)
router.get('/auth-calendly-callback', isQueryValidation(codeSchema), calendlyControllers.authCallbackCalendly)
router.get('/auth-refresh-calendly-access-token', isQueryValidation(refreshTokenSchema), calendlyControllers.RefreshCalendlyAccessToken)

router.get('/get-calendly-profile', userAuthorization, calendlyControllers.geCalendlyProfile)
router.get('/get-calendly-eventy-types', userAuthorization, isQueryValidation(getEventsTypesSchema), calendlyControllers.getCalendlyEventyTypes)
router.get('/get-calendly-eventy-type/:eventId', userAuthorization, isParamValidation(getEventSchema), calendlyControllers.getCalendlyEventyType)
router.get('/get-calendly-scheduled-events', userAuthorization, isQueryValidation(getScheduledEventsSchema), calendlyControllers.getCalendlyScheduledEvents)

router.post('/create-calendly-eventy-share', userAuthorization, isBodyValidation(createEventShareSchema), calendlyControllers.createCalendlyEventShare)
router.post('/create-calendly-one-off-eventy-type', userAuthorization, isBodyValidation(createOneOffEventsSchema), calendlyControllers.createCalendlyOneOffEventType)

export default router
