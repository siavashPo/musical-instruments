import {userValidator} from '../config/validations/user'

const {username, password} = userValidator

export const registerSchema = {
    body: {
        type: 'object',
        properties: {
          ...userValidator
        },
        required: [...Object.keys(userValidator)],
        additionalProperties: false
    }
}

export const loginSchema = {
    body: {
        type: 'object',
        properties: {
            username,
            password,
        },
        required: ['username', 'password'],
        additionalProperties: false
    }
}