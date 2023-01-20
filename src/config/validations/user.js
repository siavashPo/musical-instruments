export const userValidator = {
    name: {
        type: 'string',
        minLength: 3,
    },
    username: {
        type: 'string',
        minLength: 3,
    },
    password: {
        type: 'string',
        minLength: 4
    },
    email: {
        type: 'string',
        format: 'email',
    },
    role: {
        type: 'string',
        enum: ['ADMIN', 'SELLER', 'USER']
    }
}

