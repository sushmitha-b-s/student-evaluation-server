const Joi = require('@hapi/joi');

const classValidation = async (data) => {
    const schema = Joi.object({
        batchNo: Joi.number()
            .required(),
        startDate: Joi.string().max(15)
            .required(),
        endDate: Joi.string().max(15)
            .required()
    })

    return await schema.validate(data)
}

module.exports.classValidation = classValidation