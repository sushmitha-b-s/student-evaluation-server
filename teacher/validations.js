const Joi = require('@hapi/joi');

const registerValidation = async (data) => {
    const schema = Joi.object({
        fullname: Joi.string()
            .max(255)
            .required(),
        email: Joi.string()
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .max(255)
            .required()
    })

    return await schema.validate(data)
}

const loginValidation = async (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .max(255)
            .required()
    })

    return await schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation