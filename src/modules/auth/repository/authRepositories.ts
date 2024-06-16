import models from '../../../database/models/index'
const { users, sessions } = models


const findUserByAttributes = async (key: string, value: any) => {
  return await users.findOne({ where: { [key]: value } })
}

const createSession = async (body: any) => {
  return await sessions.create(body)
}

const findSessionByUserIdAndToken = async (userId: string, token: string) => {
  return await sessions.findOne({ where: { token, userId } })
}


export default { findUserByAttributes, createSession, findSessionByUserIdAndToken }