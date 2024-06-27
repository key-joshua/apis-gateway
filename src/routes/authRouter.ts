import { Router } from 'express'
import authControllers from '../modules/auth/controller/authControllers'
import { signinSchema } from '../modules/auth/validation/authValidations'
import { isBodyValidation, isUserVerified, isCredentialExist } from '../middlewares/validation'


const router: Router = Router()
router.post('/signin', isBodyValidation(signinSchema), isUserVerified, isCredentialExist, authControllers.signin)

export default router
