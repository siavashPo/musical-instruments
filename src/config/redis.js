import Redis from "ioredis";

export const redisClient = new Redis({
    port: process.env.REDIS_PORT,
    keyPrefix: process.env.REDIS_PREFIX_KE
})

export const EXPIRE_TIME = 3600000