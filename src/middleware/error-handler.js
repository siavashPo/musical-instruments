import {JsonSchemaValidation} from 'express-jsonschema'

export default (err, req, res, next) => {
    if (err instanceof JsonSchemaValidation) {
        return res.status(400).json({
            code: 400, message: 'Validation error', fields: err.validations
        })
    }
    if (process.env.NODE_ENV === 'development') {
        console.log(err)
    }
    const status = err.status || 500
    const message = status < 500 || process.env.NODE_ENV === 'development' ? err.message : 'Server error, please call admin'

    res.status(status).json({
        status,
        message
    })
}