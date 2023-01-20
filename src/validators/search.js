import {searchValidator} from "../config/validations/search";

export const searchSchema = {
    query: {
        type: 'object',
        properties: {
         ...searchValidator
        },
        required: ['search'],
        additionalProperties: false
    }
}