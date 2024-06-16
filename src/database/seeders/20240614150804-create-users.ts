import { QueryInterface  } from 'sequelize'
import { hashPassword } from '../../utils/passwordUtils'

const user = {
  username: 'user-one',
  email: 'user@gmail.com',
  password: hashPassword('Password@123'),
  createdAt: new Date(),
  updatedAt: new Date(),
}
  
const up = (queryInterface: QueryInterface) => queryInterface.bulkInsert('users', [user])
const down = (queryInterface: QueryInterface) => queryInterface.bulkDelete('users', [], {})
export { up, down }
