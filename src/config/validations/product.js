export const productValidator = {
    category: {
        enum: ['MUSIC', "MOBILE", "LAPTOP"],
        minLength: 1
    },
    name: {
        type: 'string',
        minLength: 1
    },
    model: {
        type: 'string',
        minLength: 1
    },
    price: {
        type: 'number',
        minLength: 1
    },
    image: {
        type: 'string',
    }
}