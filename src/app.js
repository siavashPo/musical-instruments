import express from 'express'
import 'express-async-errors'
import router from './routes'
import errorHandler from './middleware/error-handler'
import bodyParser from 'body-parser'
import { sequelize } from './config/database'
import session from 'express-session'
import connectRedis from 'connect-redis'
import auth from './middleware/auth'
import http from 'http'
import { redisClient } from './config/redis'

export const bootstrap = async () => {
    const app = express()

    app.use(express.static('public'))
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(express.json())

    const RedisStore = connectRedis(session)
    const store = new RedisStore({client: redisClient})

    const sessionMiddleware = session({
        store,
        secret: 'my secret',
        resave: false,
        saveUninitialized: true
    })

    app.use(sessionMiddleware)
    app.use(auth)
    app.use(router)
    app.use(errorHandler)

    await sequelize.authenticate()

    await sequelize.sync({alter: true})

    const server = http.createServer(app)

    return server
}
