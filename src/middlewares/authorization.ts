import httpStatus from 'http-status'
import { Response, NextFunction } from 'express'

export const userAuthorization = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1]
    if (!token) return res.status(httpStatus.UNAUTHORIZED).json({ status: httpStatus.UNAUTHORIZED, error: 'Not authorized, Authorization token is rewuired' })

    next()
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server error', error })
  }
}
