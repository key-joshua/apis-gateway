import Joi from 'joi'
import httpStatus from 'http-status'
import { Request, Response, NextFunction } from 'express'

import { comparePassword } from '../utils/passwordUtils'
import authRepositories from '../modules/auth/repository/authRepositories'

const validation = (schema: Joi.ObjectSchema | Joi.ArraySchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
        const { error } = schema.validate(req.body, { abortEarly: false })
        if (error) {
          throw new Error(error.details.map((detail) => detail.message.replace(/"/g, '')).join(', '))
        }

        return next()
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, error: error.message })
  }
}

const isUserVerified = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await authRepositories.findUserByAttributes('email', req.body.email)
    if (!user) return res.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid email or password' })
    if (user.isVerified === false) return res.status(httpStatus.UNAUTHORIZED).json({ status: httpStatus.UNAUTHORIZED, message: 'Your account is not verified yet' })

    req.user = user
    return next()
  } catch (error: any) {
    return  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, error: error.message })
  }
}

const isCredentialExist = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await authRepositories.findUserByAttributes('email', req.body.email)
    if (!user) return res.status(httpStatus.BAD_REQUEST).json({ error: httpStatus.BAD_REQUEST, message: 'Invalid email or password' })

    const passwordMatches = await comparePassword(req.body.password, user.password)
    if (!passwordMatches) return res.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid email or password' })

    req.user = user
    return next()
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server error', data: error.message })
  }
}

export { validation, isCredentialExist, isUserVerified }