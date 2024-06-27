import httpStatus from 'http-status'
import { Response } from 'express'

import { generateToken } from '../../../utils/jwtUtil'
import authRepositories from '../repository/authRepositories'


const signin = async (req: any, res: Response) => {
  try {
    const token = generateToken(req.user.id.toString(), process.env.JWT_SECRET as string)
    const session = { userId: req.user.id, device: req.headers['user-device'], token: token }

    await authRepositories.createSession(session)
    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: 'Logged in successfully', data: { token } })
  } catch (error: unknown) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server error', error })
  }
}

export default { signin }