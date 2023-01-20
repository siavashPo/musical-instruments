import '../src/config/loadTestEnv'
import supertest from 'supertest';
import {bootstrap} from "../src/app";

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


describe('Profile', () => {
    test('Get personal data 200', async () => {
        const response = await request.get('/profile').set('cookie', cookieSession)
        expect(response.statusCode).toBe(200)
        checkProfile(response.body)
    })
    test('Get personal data 401', async () => {
        const response = await request.get('/profile')
        expect(response.statusCode).toBe(401)
    })
})

const checkProfile = (profile) => {
    expect(profile).toHaveProperty('id')
    expect(profile.name).toBe(fakeUser.name)
    expect(profile.username).toBe(fakeUser.username)
    expect(profile.password).toBe(undefined)
    expect(profile.email).toBe(fakeUser.email)
    expect(profile.role).toBe(fakeUser.role)
}