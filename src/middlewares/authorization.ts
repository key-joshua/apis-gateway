import httpStatus from 'http-status'
import { Response, NextFunction } from 'express'

import { verifyToken } from '../utils/jwtUtil'
import authRepository from '../modules/auth/repository/authRepositories'

export const userAuthorization = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1]
    if (!token) return res.status(httpStatus.UNAUTHORIZED).json({ status: httpStatus.UNAUTHORIZED, error: 'Not authorized' })

    const verifiedToken: any = await verifyToken(token, process.env.JWT_SECRET as string)
    const session = await authRepository.findSessionByUserIdAndToken(verifiedToken.id, token)
    if (!session) return res.status(httpStatus.UNAUTHORIZED).json({ status: httpStatus.UNAUTHORIZED, message: 'Not authorized' })

    const user = await authRepository.findUserByAttributes('id', verifiedToken.id)
    if (!user) return res.status(httpStatus.UNAUTHORIZED).json({ status: httpStatus.UNAUTHORIZED, message: 'Not authorized' })

    req.user = user
    req.session = session
    next()
  } catch (error: any) {
    return  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, error: error.message })
  }
}
