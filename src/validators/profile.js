import {userValidator} from "../config/validations/user";

const {name, email, password, role} = userValidator

export const profileSchema = {
    body: {
        type: 'object',
        properties: {
            name,
            email,
            password,
            role
        },
        additionalProperties: false
    }
}