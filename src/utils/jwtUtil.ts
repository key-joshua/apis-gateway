import { JwtPayload, sign, verify } from 'jsonwebtoken'

const generateToken = (id: string, key: string): string => {
  return sign({ id }, key, { expiresIn: '1h' })
}

const verifyToken = (token: string, key: string): JwtPayload => {
  return verify(token, key) as JwtPayload
}

export { generateToken, verifyToken }
