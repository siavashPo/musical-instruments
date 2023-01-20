import '../src/config/loadTestEnv'
import supertest from 'supertest';
import {bootstrap} from "../src/app";
import User from "../src/models/user";
import {redisClient} from "../src/config/redis";

let request, cookieSession

const fakeUser = {
    name: 'fake_user',
    username: 'fake_username',
    password: 'fakeTest',
    email: 'fake@gmail.com',
    role: 'USER'
}

beforeAll(async () => {
    const app = await bootstrap()
    request = supertest(app)

    await request.post('/auth/register').send(fakeUser)
    const response = await request.post('/auth/login').send({
        username: fakeUser.username,
        password: fakeUser.password
    })
    cookieSession = response.header['set-cookie'][0]
})

describe('Authentication', () => {

    // Register Test
    test('register 200', async () => {
        const response = await request.post('/auth/register').send(fakeUser)
        expect(response.statusCode).toBe(200)
    })
    test('register 403', async () => {
        const response = await request.post('/auth/register').send(fakeUser)
            .set('cookie', cookieSession)
        expect(response.statusCode).toBe(403)
    })


    // Login Test
    test('login 200', async () => {
        await request.post('/auth/login').send(fakeUser)
        const response = await request.post('/auth/login').send({
            username: fakeUser.username,
            password: fakeUser.password
        })
        expect(response.statusCode).toBe(200)
        checkUser(response.body)
    })
    test('login 400', async () => {
        await request.post('/auth/login').send(fakeUser)
        const response = await request.post('/auth/login').send({
            username: fakeUser.username,
        })
        expect(response.statusCode).toBe(400)
    })
    test('login 403', async () => {
        const response = await request.post('/auth/login').send({
            username: fakeUser.username,
            password: fakeUser.password
        })
            .set('cookie', cookieSession)
        expect(response.statusCode).toBe(403)
    })


    // Logout Test
    test('logout 200', async () => {
        const response = await request.get('/auth/logout')
            .set('cookie', cookieSession)
        expect(response.statusCode).toBe(200)
    })
    test('logout 401', async () => {
        const response = await request.get('/auth/logout')
        expect(response.statusCode).toBe(401)
    })
})

afterAll(async () => {
    await User.destroy({where: {username: fakeUser.username}})
    redisClient.flushall()
    redisClient.disconnect()
})

const checkUser = (user) => {
    expect(user).toHaveProperty('id')
    expect(user.name).toBe(fakeUser.name)
    expect(user.username).toBe(fakeUser.username)
    expect(user.password).toBe(undefined)
    expect(user.email).toBe(fakeUser.email)
    expect(user.role).toBe(fakeUser.role)
}