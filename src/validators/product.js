import {productValidator} from "../config/validations/product";

export const createProductSchema = {
    body: {
        type: 'object',
        properties: {
         ...productValidator
        },
        required: ['category', 'name', 'model', 'price'],
        additionalProperties: false
    }
}

export const updateProductSchema = {
    body: {
        type: 'object',
        properties: {
            ...productValidator
        },
        additionalProperties: false
    }
}