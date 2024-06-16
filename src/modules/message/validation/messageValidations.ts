import Joi from 'joi'

const messageSchema = Joi.object({
  message: Joi.string().required().messages({
      'string.base': 'message should be a type of text',
      'string.message': 'message must be a valid message',
      'string.empty': 'message cannot be an empty field',
      'any.required': 'message is required'
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'email should be a type of text',
    'string.email': 'email must be a valid email',
    'string.empty': 'email cannot be an empty field',
    'any.required': 'email is required'
}),
})

export { messageSchema }
