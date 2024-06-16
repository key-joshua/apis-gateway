import { Dialect } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

module.exports = {
    development: {
        logging: false as boolean,
        dialect: 'postgres' as Dialect,
        host:  process.env.DATABASE_HOST_DEVELOPMENT as string,
        database:  process.env.DATABASE_NAME_DEVELOPMENT as string,
        port: Number(process.env.DATABASE_PORT_DEVELOPMENT) as number,
        username:  process.env.DATABASE_USERNAME_DEVELOPMENT as string,
        password:  process.env.DATABASE_PASSWORD_DEVELOPMENT as string,
    },
    production: {
        logging: false as boolean,
        dialect: 'postgres' as Dialect,
        host:  process.env.DATABASE_HOST_PRODUCTION as string,
        database:  process.env.DATABASE_NAME_PRODUCTION as string,
        port: Number(process.env.DATABASE_PORT_PRODUCTION) as number,
        username:  process.env.DATABASE_USERNAME_PRODUCTION as string,
        password:  process.env.DATABASE_PASSWORD_PRODUCTION as string,
    },
}
