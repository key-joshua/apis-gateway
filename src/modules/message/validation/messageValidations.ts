import Joi from 'joi'
import joiPhone from 'joi-phone-number'

const customJoi = Joi.extend(joiPhone)

const emailMesageSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'email should be a type of text',
    'string.email': 'email must be a valid email',
    'string.empty': 'email cannot be an empty field',
    'any.required': 'email is required'
  }),
  message: Joi.string().required().messages({
      'string.base': 'message should be a type of text',
      'string.message': 'message must be a valid message',
      'string.empty': 'message cannot be an empty field',
      'any.required': 'message is required'
  }),
})

const smsMesageSchema = Joi.object({
  phone: customJoi.string().phoneNumber({ format: 'international', strict: true }).required().messages({
    'any.required': 'phone is required',
    'string.empty': 'phone is not allowed to be empty',
    'phoneNumber.invalid': 'phone should contains country code. ex: +142423121276',
  }),
  message: Joi.string().required().messages({
      'string.base': 'message should be a type of text',
      'string.message': 'message must be a valid message',
      'string.empty': 'message cannot be an empty field',
      'any.required': 'message is required'
  }),
})

export { emailMesageSchema, smsMesageSchema }
